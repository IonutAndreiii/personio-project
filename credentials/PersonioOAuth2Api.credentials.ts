import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PersonioOAuth2Api implements ICredentialType {
	name = 'personioOAuth2Api';
	displayName = 'Personio OAuth2 API';
	extends = ['oAuth2Api'];

	documentationUrl = 'https://developer.personio.de/reference/introduction';
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://api.personio.de/v1/auth',
			required: true,
	},
	{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
			required: true,
	},
	{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
	},
	{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
	},
	];

}
