const express=require('express')

const {graphqlHTTP}=require('express-graphql')
const schema=require('./schema/schema');
const port = process.env.PORT || 5000;
const cors=require('cors');
const connectDB=require('./config/db');
const app =express();
connectDB();
app.use(cors())

//bcoz push to heroku
app.set('trust proxy', 1);


app.use('/graphql',graphqlHTTP({
schema,
graphiql:process.env.NODE_ENV='production'
}))


//Step 1 serve static assests if in production

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
  }

app.listen(port,console.log(`Server running on port ${port}`));
