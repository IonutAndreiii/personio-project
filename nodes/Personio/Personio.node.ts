import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import {EmployeeOperations, EmployeeFields} from './EmployeeDescription'

export class Personio implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Personio',
		name: 'Personio',
		icon: 'file:personio.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Personio API Operations',
		defaults: {
			name: 'Personio',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'personioOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Employee',
						value: 'employee',
					},
				],
				default: 'employee',
			},

// EMPLOYEE
...EmployeeOperations,
...EmployeeFields,



		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let credentials = await this.getCredentials('personioOAuth2Api') as any;

		const options: IHttpRequestOptions = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: {
				client_id: credentials.clientId,
				client_secret: credentials.clientSecret
			},
			url: credentials.accessTokenUrl,
			json: true,
		};

		responseData = await this.helpers.httpRequest(
			options,
		) as any;

		const accessToken = responseData.data.token

		for (let i = 0; i < items.length; i++) {


			// Get Employees Custom Attributes
			if (resource === 'employee') {
				if (operation === 'getEmployeesCustomAttributes') {
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`
						},
						method: 'GET',
						body: {},
						url: `https://api.personio.de/v1/company/employees/custom-attributes`,
						json: true,
					};

					responseData = await this.helpers.httpRequest(
						options,
					);
					returnData.push(responseData);

				}
			}

		}


		return [this.helpers.returnJsonArray(returnData)];
	}
}
