import { INodeType, INodeTypeDescription } from 'n8n-workflow';
//import { httpVerbFields, httpVerbOperations } from './HttpVerbDescription';

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
			name: 'Personio API Operations',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'personioOAuth2Api',
				required: false,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.personio.de/v1',
			url: '',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Resources and operations will go here
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Employee',
						value: 'Employee',
					},
				],
				default: 'Employee',
			},
			// Operations for Employee will go here
      {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['Employee'],
					},
				},
				options: [
					{
						name: 'Get an Employee',
						value: 'getAnEmployee',
						action: 'Show employee by ID',
						description: 'Show Employee By ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/company/employees/{{$parameters.employeeId}}',
							},
						},
					},
					{
						name: 'List Employees',
						value: 'listEmployees',
						action: 'List company employees',
						description: 'List Company Employees',
						routing: {
							request: {
								method: 'GET',
								url: '=/company/employees',
							},
						},
					},
          {
						name: 'Get an Employee Absence Balance',
						value: 'getEmployeeAbsenceBalance',
						action: 'Retrieve the absence balance for a specific employee',
						description: 'Retrieve the absence balance for a specific employee',
						routing: {
							request: {
								method: 'GET',
								url: '=/company/employees/{{$parameters.employee_id}}/absences/balance',
							},
						},
					},
          {
						name: 'Get Employees Custom Attributes',
						value: 'getEmployeesCustomAttributes',
						action: 'Lists all the allowed custom atrributes per API credentials',
						description: 'Lists all the allowed custom atrributes per API credentials',
						routing: {
							request: {
								method: 'GET',
								url: '=/company/employees/custom-attributes',
							},
						},
					},
				],
				default: 'getAnEmployee',
			},

		   // Fields for Employee operation
			// Fields for getAnEmployee operation

						{
							displayName: 'Employee ID',
							description: 'Type in the Employee ID',
							required: true,
							name: 'employeeId',
							type: 'string',
							default: '',
							hint: 'Numeric id of the employee',
							displayOptions: {
								show: {
									resource: ['Employee'],
									operation: ['getAnEmployee'],
								},
							},
						},
			//Fields for listEmployees operation
			{
				displayName: 'Email',
				description: 'Type in the Employee Email',
				name: 'employeeEmail',
				type: 'string',
				default: '',
				hint: 'Find an employee with the given email address.',
				displayOptions: {
					show: {
						resource: ['Employee'],
						operation: ['listEmployees'],
					},
				},
			},
			{
				displayName: 'Offset',
				description: 'Type in the Employee Offset',
				name: 'employeeOffset',
				type: 'number',
				default: '',
				hint: 'Pagination attribute to identify the first item in the collection to return.',
				displayOptions: {
					show: {
						resource: ['Employee'],
						operation: ['listEmployees'],
					},
				},
			},
			{
				displayName: 'Limit',
				description: 'Type in the Employee Limit',
				name: 'employeeLimit',
				type: 'number',
				default: '',
				hint: 'Pagination attribute to limit the number of employees returned per page.',
				displayOptions: {
					show: {
						resource: ['Employee'],
						operation: ['listEmployees'],
					},
				},
			},
			//Fields for getEmployeeAbsenceBalance operation
		  {
				displayName: 'Employee ID',
				description: 'Type in the Employee ID',
				required: true,
				name: 'employeeId',
				type: 'string',
				default: '',
				hint: 'Numeric id of the employee',
				displayOptions: {
					show: {
						resource: ['Employee'],
						operation: ['getEmployeeAbsenceBalance'],
					},
				},
			},
			//Fields for getEmployeesCustomAttributes operation
			//This operation has no fields
		],
	};
}
