import { Tree, chain, externalSchematic, Rule, SchematicContext, apply, mergeWith, url, move } from "@angular-devkit/schematics";

export default function (options: any): Rule {

    return (host: Tree, context: SchematicContext) => {
        console.log('Running your custom schematic');

        options.name = 'test-project'
        options.skipInstall = true;
        options.routing = true;
        options.style = 'scss';
        options.version = '6.0.7';

        const sourceAppDir = `${options.name}/src/app`;
        console.log(options.style);
        return chain([
            externalSchematic('@schematics/angular', 'ng-new', options),
            mergeWith(
                apply(url('./files/interceptors'), [
                    move(sourceAppDir)
                ])
            )
        ])(host, context);
    };
}