import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

describe('Service', () => {
    const schematicRunner = new SchematicTestRunner('simple-schematic', require.resolve('../collection.json'));
    let appTree: UnitTestTree;

    beforeEach(() => {
        const workspaceOptions = {
            name: 'test-project',
            version: '6.0.7'
        };

        const applicationOptions = {
            name: 'test-project'
        };
        appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
        appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'application', applicationOptions, appTree);
    });
    it('should correctly apply HttpClientModuleImport', () => {
        const resultTree = schematicRunner.runSchematic('http-service', {}, appTree);

        const file = resultTree.readContent('/test-project/src/app/app.module.ts');
        console.log(file);
    });
})