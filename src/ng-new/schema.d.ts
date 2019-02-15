export interface Schema {
    name: string;
    directory?: string;
    skipInstall?: boolean;
    authentication?: 'SSO' | 'None';
    viewEncapsulation?: 'Emulated' | 'Native' | 'None';
    prefix?: string;
    version?: string;
    projectRoot?: string;
    routing?: boolean;
    style?: string;
}