import { INodeProperties } from 'n8n-workflow';
export const OpenPositionOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['openPosition'],
            },
        },
        options: [
            {
                name: 'List Open Positions',
                value: 'listOpenPositions',
                action: 'Retrieve open positions',
                description: 'Retrieve open positions',
            },
        ],
        default: 'listOpenPositions',
    },
];
export const OpenPositionFields: INodeProperties[] = [
    // listOpenPositions
    {
        displayName: 'X-Company-ID',
        description: "Your company's Personio ID",
        name: 'xCompanyID',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['openPosition'],
                operation: ['listOpenPositions'],
            },
        },
    },
    {
        displayName: 'Language',
        name: 'language',
        required: true,
        type: 'options',
        options: [
            {
                name: 'De',
                value: 'de',
            },
            {
                name: 'En',
                value: 'en',
            },
            {
                name: 'Es',
                value: 'es',
            },
            {
                name: 'Fr',
                value: 'fr',
            },
            {
                name: 'It',
                value: 'it',
            },
            {
                name: 'Nl',
                value: 'nl',
            },
            {
                name: 'Pt',
                value: 'pt',
            },
        ],
        default: 'de',
        description: 'Language code',
        displayOptions: {
            show: {
                resource: ['openPosition'],
                operation: ['listOpenPositions'],
            },
        },
    },
];
