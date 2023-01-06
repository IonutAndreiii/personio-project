import { INodeProperties } from 'n8n-workflow';

export const EmployeeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['employee'],
			},
		},
		options: [
			{
				name: 'Get an Employee',
				value: 'getAnEmployee',
				action: 'Show employee by ID',
				description: 'Show Employee By ID',
			},
			{
				name: 'List Employees',
				value: 'listEmployees',
				action: 'List company employees',
				description: 'List Company Employees',
			},
			{
				name: 'Get an Employee Absence Balance',
				value: 'getEmployeeAbsenceBalance',
				action: 'Retrieve the absence balance for a specific employee',
				description: 'Retrieve the absence balance for a specific employee',
			},
			{
				name: 'Get Employees Custom Attributes',
				value: 'getEmployeesCustomAttributes',
				action: 'Lists all the allowed custom atrributes per API credentials',
				description: 'Lists all the allowed custom atrributes per API credentials',
			},
		],
		default: 'getAnEmployee',
	},
];

export const EmployeeFields: INodeProperties[] = [
	// getAnEmployee
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
				resource: ['employee'],
				operation: ['getAnEmployee'],
			},
		},
	},

	// listEmployees
	{
		displayName: 'Email',
		description: 'Type in the Employee Email',
		name: 'employeeEmail',
		type: 'string',
		default: '',
		hint: 'Find an employee with the given email address.',
		displayOptions: {
			show: {
				resource: ['employee'],
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
				resource: ['employee'],
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
				resource: ['employee'],
				operation: ['listEmployees'],
			},
		},
	},

	// getEmployeeAbsenceBalance
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
				resource: ['employee'],
				operation: ['getEmployeeAbsenceBalance'],
			},
		},
	},
];
