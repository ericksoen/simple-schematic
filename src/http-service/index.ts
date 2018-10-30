
import { addSymbolToNgModuleMetadata, insertImport, isImported } from '@schematics/angular/utility/ast-utils';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import { SchematicsException } from '@angular-devkit/schematics';

export default function () {

    return (host: Tree) => {
        // TODO: Read value dynamically from project info
        const modulePath = './test-project/src/app/app.module.ts';

        // TODO: Need to reconcile between typescript 2 and typescript 3
        const moduleSource = getSourceFile(host, modulePath);

        if (!isImported(moduleSource, 'HttpClientModule', '@angular/common/http')) {
            const recorder = host.beginUpdate(modulePath);
            const importChange = insertImport(moduleSource, modulePath, 'HttpClientModule', '@angular/common/http') as InsertChange;

            if (importChange.toAdd) {
                recorder.insertRight(importChange.pos, importChange.toAdd);
                // host.commitUpdate(recorder);
            }

            const metadataChange = addSymbolToNgModuleMetadata(moduleSource, modulePath, 'imports', 'HttpClientModule');

            if (metadataChange) {
                metadataChange.forEach((change: InsertChange) => {
                    recorder.insertRight(change.pos, change.toAdd);
                });
            }

            host.commitUpdate(recorder);
        }

    }
}

function getSourceFile(host: Tree, path: string): ts.SourceFile {

    const buffer = host.read(path);

    if (!buffer) {
        throw new SchematicsException(`Could not find ${path}.`);
    }

    const content = buffer.toString();
    const source = ts.createSourceFile(path, content, ts.ScriptTarget.ES2017, true);

    return source;
}