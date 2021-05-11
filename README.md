1. Application name: FunTail

2. Server side: https://github.com/yizhuo-zoe/funtail-server-node

3. The problem trying to solve:
   - Trying to build a online drink recipe website which can provide an interface where users can identify and narrow cocktail choices based on the key features and attributes that are important to them and help them find something that exactly matches their search. Users can cerate their own drink recipes and other users can make reviews. A user can folow or unfollow other users.
   
   - Types of users: user, admin

     <img src="https://user-images.githubusercontent.com/72764920/117737947-c0626880-b1af-11eb-9104-6b3c9302cd9d.png" width="400" height="500" />
<img src="https://user-images.githubusercontent.com/72764920/117738879-e0932700-b1b1-11eb-8733-ccf0f7811b92.png" width="500" height="450" />
<img src="https://user-images.githubusercontent.com/72764920/117738975-218b3b80-b1b2-11eb-861f-d223aec31b84.png" width="550" height="300" />
<img src="https://user-images.githubusercontent.com/72764920/117738981-26e88600-b1b2-11eb-9a78-ebe0bbb0f892.png" width="550" height="300" />

4. Goals:
  - for user : 
    - Search cocktail by inputting some features and attributes.
    - Create or update a drink recipe.
    - Create or update a review for a drink recipe.
    - Follow or unfollow a user.

  - for admin:
    - Delete records of drink recipe.
    - Delete user records.
    - Create new admin role.
    
5. Overall strategy :
   - Build a client application with JavaScript, React and Redux.  
   - Build the server with nodejs and mongoose.
   - Work with data available from some public, free, Web API.
   - Use mongodb database to store data.
 
6. A brief description of the Web API:
   - [Web API Link](https://www.thecocktaildb.com/api.php)
   - This Web API can give 1000s cocktails, can search for recipes, images of specific cocktails, ingredients, filter by alcoholic, non alcoholic and so on.
