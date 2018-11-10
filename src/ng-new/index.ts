import { Tree, chain, externalSchematic, Rule, SchematicContext, apply, mergeWith, url, move, MergeStrategy, SchematicsException, noop, template } from '@angular-devkit/schematics';
import { Schema as NewWorkspaceOptions } from './schema';

export default function (options: NewWorkspaceOptions): Rule {

    return (host: Tree, context: SchematicContext) => {
        console.log('Running your custom schematic');

        // TODO: Name argument not picked up unless --name is respecified
        const workspaceOptions: NewWorkspaceOptions = { ...options, version: '7.0.3', routing: false, style: 'scss', skipInstall: true, projectRoot: 'src', directory: options.name, authentication: 'SSO' };

        // TODO: Default value not supplied?
        if (workspaceOptions.authentication === undefined) {
            workspaceOptions.authentication = 'None';
        }
        const rootDir = `${workspaceOptions.name}/${workspaceOptions.projectRoot}`;
        const sourceAppDir = `${rootDir}/app`;

        console.log(workspaceOptions.authentication);
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
                        'auth': 'SSO' // TODO: Using config value returns 'undefined'
                    }),
                    move(`${rootDir}/environments`)
                ]), MergeStrategy.AllowCreationConflict
            ),
            mergeWith(
                apply(url('./files/app'), [
                    template({
                        'auth': 'SSO' // TODO: Using config value returns 'undefined'
                    }),
                    move(`${sourceAppDir}`)
                ]), MergeStrategy.AllowCreationConflict
            ),
            mergeWith(
                apply(url('./files/core'), [
                    template({
                        'auth': 'SSO' // TODO: Using config value returns 'undefined
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