// Import External Dependancies
const graphql = require('graphql')

// Destructure GraphQL functions
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql

// Import Controllers
const carController = require('../controllers/carController')
const ownerController = require('../controllers/ownerController')
const serviceController = require('../controllers/serviceController')

// Define Object Types
const carType = new GraphQLObjectType({
	name: 'Car',
	fields: () => ({
		_id: { type: GraphQLID },
		title: { type: GraphQLString },
		brand: { type: GraphQLString },
		price: { type: GraphQLString },
		age: { type: GraphQLInt },
		owner_id: { type: GraphQLID },
		owner: {
			type: ownerType,
			async resolve(parent, args) {
				return await ownerController.getSingleOwner({ id: parent.owner_id })
			}
		},
		services: {
			type: new GraphQLList(serviceType),
			async resolve(parent, args) {
				return await serviceController.getCarsServices({ id: parent._id })
			}
		}
	})
});

const ownerType = new GraphQLObjectType({
	name: 'Owner',
	fields: () => ({})
})

const serviceType = new GraphQLObjectType({
	name: 'Service',
	fields: () => ({})
})

// Define Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		car: {},
		cars: {},
		owner: {},
		service: {}
	}
})

// Define Mutations
const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		addCar: {
			type: carType,
			args: {},
			async resolve(args) {
				return ''
			}
		},
		editCar: {
			type: carType,
			args: {},
			async resolve(args) {
				return ''
			}
		},
		deleteCar: {
			type: carType,
			args: {},
			async resolve(args) {
				return ''
			}
		}
	}
})

// Export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})