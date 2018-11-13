import { Tree, chain, externalSchematic, Rule, SchematicContext, apply, mergeWith, url, move, MergeStrategy, SchematicsException, noop, template } from '@angular-devkit/schematics';
import { Schema as NewWorkspaceOptions } from './schema';

export default function (options: NewWorkspaceOptions): Rule {

    return (host: Tree, context: SchematicContext) => {

        const workspaceOptions: NewWorkspaceOptions = { ...options, version: '7.0.3', routing: false, style: 'scss', skipInstall: true, projectRoot: 'src', directory: options.name };

        const rootDir = `${workspaceOptions.name}/${workspaceOptions.projectRoot}`;
        const sourceAppDir = `${rootDir}/app`;

        const ssoOnlyFiles = workspaceOptions.authentication === 'SSO' ?
            chain([
                mergeWith(
                    apply(url('./files/sso/assets'), [
                        move(`${rootDir}/assets`)
                    ]),
                ),
                mergeWith(
                    apply(url('./files/sso/core'), [
                        move(`${sourceAppDir}/core`)
                    ])
                )
            ]) : noop();

        const ruleChain = chain([
            externalSchematic('@schematics/angular', 'ng-new', workspaceOptions),
            mergeWith(
                apply(url('./files/style'), [
                    move(`${rootDir}`)
                ]), MergeStrategy.AllowCreationConflict
            ),
            mergeWith(
                apply(url('./files/environment'), [
                    template({
                        'auth': options.authentication
                    }),
                    move(`${rootDir}/environments`)
                ]), MergeStrategy.AllowCreationConflict
            ),
            mergeWith(
                apply(url('./files/app'), [
                    template({
                        'auth': options.authentication,
                        'selector': options.prefix
                    }),
                    move(`${sourceAppDir}`)
                ]), MergeStrategy.AllowCreationConflict
            ),
            mergeWith(
                apply(url('./files/core'), [
                    template({
                        'auth': options.authentication
                    }),
                    move(`${sourceAppDir}/core`)
                ])
            ),
            ssoOnlyFiles,
            addMaterialToPackageImports(workspaceOptions),
        ]);

        return ruleChain(host, context);
    };
}

function addMaterialToPackageImports(options: NewWorkspaceOptions): Rule {

    return (host: Tree) => {
        const path = `${options.name}/package.json`;
        const buffer = host.read(path);

        if (buffer === null) {
            throw new SchematicsException('Could not read package.json');
        }

        const pkg = JSON.parse(buffer.toString());

        if (!pkg.dependencies) {
            pkg.dependencies = {};
        }

        pkg.dependencies['@angular/material'] = '7.0.2';
        pkg.dependencies['@angular/cdk'] = '7.0.2';
        pkg.dependencies['oidc-client'] = '1.5.4';
        pkg.dependencies['rxjs-compat'] = '6.3.3';
        host.overwrite(path, JSON.stringify(pkg, null, 2));

        return host;
    }

}