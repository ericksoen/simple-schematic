import { Tree, chain, externalSchematic, Rule, SchematicContext } from "@angular-devkit/schematics";

export default function(options: any): Rule {

    return (host: Tree, context: SchematicContext) => {
        return chain([
            externalSchematic('@schematics/angular', 'ng-new', options)
        ])(host, context);
    };
}