// note that Auth is top-level, whereas the API stuff is not
const awsmobile = {
	Auth: {
		region: 'your-region',
		userPoolId: 'your-region_YOUR_REGION_ID',
		userPoolWebClientId: '6vstsuciYOURCLIENTID',
		identityPoolId: 'identitypoolID',
		
	},
	Storage: {
		AWSS3: {
			bucket: 'bucket-name',
			region: 'your-region',
		},
	},
	aws_project_region: 'your-region',
	aws_appsync_graphqlEndpoint:
		'https://your-api.appsync-api.your-region.amazonaws.com/graphql',
	aws_appsync_region: 'your-region',
	aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
}

export default awsmobile
