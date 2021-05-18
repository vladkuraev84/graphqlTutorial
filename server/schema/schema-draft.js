const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

/*
const directorsJson = [
    { "name": "Quentin Tarantino", "age": 55 },60a39745f5c316c72341bf2e
    { "name": "Michail Redford", "age": 72 },60a398def5c316c72341bf2f
    { "name": "James McTeigue", "age": 51 },60a39935f5c316c72341bf30
    { "name": "Guy Ritchie", "age": 50 }60a39952f5c316c72341bf31
]

const moviesJson = [
    { "name": "Pulp Fiction", "genre": "Crime", "directorId": "60a39745f5c316c72341bf2e"},
    { "name": "1984", "genre": "Sci-Fi", "directorId": "60a398def5c316c72341bf2f"},
    { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "60a39935f5c316c72341bf30"},
    { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "60a39952f5c316c72341bf31"},
    { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "60a39745f5c316c72341bf2e"},
    { "name": "The Hateful Eight", "genre": "Crime", "directorId": "60a39745f5c316c72341bf2e"},
    { "name": "Inglouriuos Basterds", "genre": "Crime", "directorId": "60a39745f5c316c72341bf2e"},
    { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime", "directorId": "60a39952f5c316c72341bf31"}
]
*/

const movies = [
    { id: "1", name: "Pulp Fiction", genre: "Crime", directorId: "1" },
    { id: "2", name: "1984", genre: "Sci-Fi", directorId: "2" },
    { id: 3, name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
    { id: 4, name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
    { id: "5", name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
    { id: "6", name: "The Hateful Eight", genre: "Crime", directorId: "1" },
    { id: "7", name: "Inglouriuos Basterds", genre: "Crime", directorId: "1" },
    { id: "7", name: "Lock, Stock and Two Smoking Barrels", genre: "Crime", directorId: "4" },
]

const directors = [
    { id: "1", name: "Quentin Tarantino", age: 55 },
    { id: "2", name: "Michail Redford", age: 72 },
    { id: "3", name: "James McTeigue", age: 51 },
    { id: "4", name: "Guy Ritchie", age: 50 }
]

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return directors.find(director => director.id === parent.id)
            },
        },
    }),
});

const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.filter( movie => movie.directorId === parent.id )
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return movies.find( movie => movie.id == args.id )
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return directors.find( director => director.id == args.id )
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query,
})