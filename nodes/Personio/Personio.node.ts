import moment from 'moment';
import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { OptionsWithUri } from 'request';
import { EmployeeOperations, EmployeeFields } from './EmployeeDescription';
import { CompanyOperations, CompanyFields } from './CompanyDescription';
import { OpenPositionOperations, OpenPositionFields } from './OpenPositionDescription';

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
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Open Position',
						value: 'openPosition',
					},
				],
				default: 'employee',
			},

			// EMPLOYEE
			...EmployeeOperations,
			...EmployeeFields,
			// COMPANY
			...CompanyOperations,
			...CompanyFields,
			// OPEN POSITION
			...OpenPositionOperations,
			...OpenPositionFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {

		let credentials = (await this.getCredentials('personioOAuth2Api')) as any;

		const options: IHttpRequestOptions = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: {
				client_id: credentials.clientId,
				client_secret: credentials.clientSecret,
			},
			url: credentials.accessTokenUrl,
			json: true,
		};

		responseData = (await this.helpers.httpRequest(options)) as any;

		const accessToken = responseData.data.token;

			// Get Employees Custom Attributes
			if (resource === 'employee') {
				if (operation === 'getEmployeesCustomAttributes') {
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`,
						},
						method: 'GET',
						body: {},
						url: `https://api.personio.de/v1/company/employees/custom-attributes`,
						json: true,
					};

					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
			// Get an Employee
			if (resource === 'employee') {
				if (operation === 'getAnEmployee') {
					const employeeId = this.getNodeParameter('employeeId', i) as string;
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`,
						},
						method: 'GET',
						body: {},
						url: `https://api.personio.de/v1/company/employees/${employeeId}`,
						json: true,
					};
				//	console.log(options);
					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
			// List Employees
			if (resource === 'employee') {
				if (operation === 'listEmployees') {
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`,
						},
						method: 'GET',
						body: {},
						url: `https://api.personio.de/v1/company/employees`,
						json: true,
					};

					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
			// Get an Employee Absence Balance
			if (resource === 'employee') {
				if (operation === 'getEmployeeAbsenceBalance') {
					const employeeId = this.getNodeParameter('employeeId', i) as string;
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`,
						},
						method: 'GET',
						body: {},
						url: `https://api.personio.de/v1/company/employees/${employeeId}/absences/balance`,
						json: true,
					};
				//	console.log(options);
					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
			// Search Time Offs
			if (resource === 'company') {
				if (operation === 'searchTimeOffs') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qsObj: any = {};
					if (additionalFields.start_date && additionalFields.start_date !== '') {
						const start_date = moment(additionalFields.start_date.toString()).format('yyyy-MM-DD');
						qsObj.start_date = start_date;
					}
					if (additionalFields.end_date && additionalFields.end_date !== '') {
						const end_date = moment(additionalFields.end_date.toString()).format('yyyy-MM-DD');
						qsObj.end_date = end_date;
					}
					if (additionalFields.updated_from && additionalFields.updated_from !== '') {
						const updated_from = moment(additionalFields.updated_from.toString()).format(
							'yyyy-MM-DD',
						);
						qsObj.updated_from = updated_from;
					}
					if (additionalFields.updated_to && additionalFields.updated_to !== '') {
						const updated_to = moment(additionalFields.updated_to.toString()).format('yyyy-MM-DD');
						qsObj.updated_to = updated_to;
					}
					const employees = additionalFields.employees as string;
					if (employees && employees !== '' && !employees.includes(' ')) {
						let arr = employees.split(',');
						let intArr: number[] = [];
						arr.forEach((el) => intArr.push(+el));
						qsObj.employees = intArr;
					}
					// limit
					if (additionalFields.limit) {
						if (additionalFields.limit > 0) {
							qsObj.limit = additionalFields.limit;
						}
					}
					// offset
					if (additionalFields.offset) {
						if (additionalFields.offset > 0) {
							qsObj.offset = additionalFields.offset;
						}
					}
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`,
						},
						method: 'GET',
						qs: qsObj,
						body: {},
						url: `https://api.personio.de/v1/company/time-offs`,
						json: true,
					};
				//	console.log(options);
					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
			// Search Attendances
			if (resource === 'company') {
				if (operation === 'searchAttendances') {
					const start_date = this.getNodeParameter('start_date', i) as string;
					const end_date = this.getNodeParameter('end_date', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qsObj: any = {};
					if (start_date && start_date !== '') {
						qsObj.start_date = moment(start_date).format('yyyy-MM-DD');
					}
					if (end_date && end_date !== '') {
						qsObj.end_date = moment(end_date).format('yyyy-MM-DD');
					}
					if (additionalFields.updated_from && additionalFields.updated_from !== '') {
						const updated_from = moment(additionalFields.updated_from.toString()).format(
							'yyyy-MM-DD',
						);
						qsObj.updated_from = updated_from;
					}
					if (additionalFields.updated_to && additionalFields.updated_to !== '') {
						const updated_to = moment(additionalFields.updated_to.toString()).format('yyyy-MM-DD');
						qsObj.updated_to = updated_to;
					}
					if (typeof additionalFields.includePending !== 'undefined') {
						const includePending = additionalFields.includePending as boolean;
						qsObj.includePending = includePending;
					}
					const employees = additionalFields.employees as string;
					if (employees && employees !== '' && !employees.includes(' ')) {
						let arr = employees.split(',');
						let intArr: number[] = [];
						arr.forEach((el) => intArr.push(+el));
						qsObj.employees = intArr;
					}
					// limit
					if (additionalFields.limit) {
						if (additionalFields.limit > 0) {
							qsObj.limit = additionalFields.limit;
						}
					}
					// offset
					if (additionalFields.offset) {
						if (additionalFields.offset > 0) {
							qsObj.offset = additionalFields.offset;
						}
					}
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`,
						},
						method: 'GET',
						qs: qsObj,
						body: {},
						url: `https://api.personio.de/v1/company/attendances`,
						json: true,
					};
				//	console.log(options);
					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
			// Get Time Off
			if (resource === 'company') {
				if (operation === 'getTimeOff') {
					const id = this.getNodeParameter('id', i) as number;
					if (!id) {
						throw new NodeOperationError(this.getNode(), `ID should not be empty!`, {
							itemIndex: i,
						});
					}
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`,
						},
						method: 'GET',
						body: {},
						url: `https://api.personio.de/v1/company/time-offs/${id}`,
						json: true,
					};
				//	console.log(options);
					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
			// List Time Off Types
			if (resource === 'company') {
				if (operation === 'listTimeOffTypes') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qsObj: any = {};
					// limit
					if (additionalFields.limit) {
						if (additionalFields.limit > 0) {
							qsObj.limit = additionalFields.limit;
						}
					}
					// offset
					if (additionalFields.offset) {
						if (additionalFields.offset > 0) {
							qsObj.offset = additionalFields.offset;
						}
					}
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							authorization: `Bearer ${accessToken}`,
						},
						method: 'GET',
						body: {},
						qs: qsObj,
						url: `https://api.personio.de/v1/company/time-off-types`,
						json: true,
					};
				//	console.log(options);
					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
			// List Open Positions
			if (resource === 'openPosition') {
				if (operation === 'listOpenPositions') {
					const xCompanyID = this.getNodeParameter('xCompanyID', i) as string;
					const language = this.getNodeParameter('language', i) as string;
					if (!xCompanyID || xCompanyID === '') {
						throw new NodeOperationError(this.getNode(), `X-Company-ID should not be empty!`, {
							itemIndex: i,
						});
					}
					if (!language || language === '') {
						throw new NodeOperationError(this.getNode(), `Language should not be empty!`, {
							itemIndex: i,
						});
					}
					const qsObj: any = {};
					qsObj.language = language;
					const options: IHttpRequestOptions = {
						headers: {
							Accept: 'application/xml',
							authorization: `Bearer ${accessToken}`,
							'X-Company-ID': xCompanyID,
						},
						method: 'GET',
						body: {},
						qs: qsObj,
						url: `https://api.personio.de/xml`,
					};
				//	console.log(options);
					responseData = await this.helpers.httpRequest(options);
					returnData.push(responseData);
				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
