import { INodeProperties } from 'n8n-workflow';
export const CompanyOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['company'],
            },
        },
        options: [
            {
                name: 'Search Time Offs',
                value: 'searchTimeOffs',
                action: 'Fetches absence periods for absences tracked in days',
                description: 'Fetches absence periods for absences tracked in days',
            },
            {
                name: 'Search Attendances',
                value: 'searchAttendances',
                action: 'Fetch attendance data for the company employees',
                description: 'Fetch attendance data for the company employees',
            },
            {
                name: 'Get Time Off',
                value: 'getTimeOff',
                action: 'Gets an absence period for absences tracked in days',
                description: 'Gets an absence period for absences tracked in days',
            },
            {
                name: 'List Time Off Types',
                value: 'listTimeOffTypes',
                action: 'Provides a list of absence types for absences tracked in days',
                description: 'Provides a list of absence types for absences tracked in days',
            },
        ],
        default: 'searchTimeOffs',
    },
];
export const CompanyFields: INodeProperties[] = [
    // searchTimeOffs
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['searchTimeOffs'],
            },
        },
        options: [
            {
                displayName: 'Start Date',
                description:
                    'First day of the period to be queried. It is inclusive, so the result starts from and including the provided.',
                name: 'start_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'End Date',
                description: 'Last day of the period to be queried. It is inclusive.',
                name: 'end_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Updated From',
                description: 'Query the periods that created or modified from the date',
                name: 'updated_from',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Updated To',
                description: 'Query the periods that created or modified until the date updated_to',
                name: 'updated_to',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Employees',
                name: 'employees',
                type: 'string',
                default: '',
                description: "A list of Personio employee ID's to filter the results",
                hint: "Separate multiple integer values with comma ',' and no spaces",
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                },
                default: 50,
                description: 'Max number of results to return',
            },
            {
                displayName: 'Offset',
                name: 'offset',
                type: 'number',
                default: 1,
                description:
                    'Pagination attribute to identify which page you are requesting, by the form of telling an offset from the first record that would be returned',
            },
        ],
    },
    // searchAttendances
    {
        displayName: 'Start Date',
        description: 'First day of the period to be queried',
        name: 'start_date',
        required: true,
        type: 'dateTime',
        default: '',
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['searchAttendances'],
            },
        },
    },
    {
        displayName: 'End Date',
        description: 'Last day of the period to be queried',
        name: 'end_date',
        required: true,
        type: 'dateTime',
        default: '',
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['searchAttendances'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['searchAttendances'],
            },
        },
        options: [
            {
                displayName: 'Updated From',
                description: 'Datetime from when the queried periods have been updated',
                name: 'updated_from',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Updated To',
                description: 'Datetime until when the queried periods have been updated',
                name: 'updated_to',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Include Pending',
                description:
                    'Whether to return AttendancePeriods with a status of pending, rejected and confirmed',
                name: 'includePending',
                type: 'boolean',
                default: true,
            },
            {
                displayName: 'Employees',
                name: 'employees',
                type: 'string',
                default: '',
                description: "A list of Personio employee ID's to filter the results",
                hint: "Separate multiple integer values with comma ',' and no spaces",
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                },
                default: 50,
                description: 'Max number of results to return',
            },
            {
                displayName: 'Offset',
                name: 'offset',
                type: 'number',
                default: 1,
                description:
                    'Pagination attribute to identify which page you are requesting, by the form of telling an offset from the first record that would be returned',
            },
        ],
    },
    // getTimeOff
    {
        displayName: 'ID',
        description: 'Numeric ID of the absence period',
        name: 'id',
        required: true,
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['getTimeOff'],
            },
        },
    },
    //listTimeOffTypes
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['company'],
                operation: ['listTimeOffTypes'],
            },
        },
        options: [
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                },
                default: 50,
                description: 'Max number of results to return',
            },
            {
                displayName: 'Offset',
                name: 'offset',
                type: 'number',
                default: 1,
                description:
                    'Pagination attribute to identify which page you are requesting, by the form of telling an offset from the first record that would be returned',
            },
        ],
    },
];
