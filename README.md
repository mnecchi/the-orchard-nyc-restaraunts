# The Papaya / Big Apple Orchard  Search

## The problems 🤔

1) Someone has told my friend (let's call him Tom) about a new incredible Thai restaurant.<br/>
Tom only knows the name of the restaurant and borough where it is located.
He also doesn't trust anyone, so he wants to check if the restaurant is good enough, which, in his world, means it has a grade greater or equal to B.<br/>

2) After eating at the same place for years, Tom wants to try something new. But, of course, only Thai and with a grade greater than B.

3) The same as the above for a different type of cuisine.

## The solutions 💡

1) Tom decides to use [**The Papaya Orchard Search**](https://cryptic-eyrie-45126.herokuapp.com) and searches for that restaurant...Sabay...Queens...and boom! Grade B! Not the best, but good enough. Let's go then!

2) He uses [**The Papaya Orchard Search**](https://cryptic-eyrie-45126.herokuapp.com) again but he leaves all the fields empty this time...boom!<br/>
A list of all the Thai places he can try! He can also click on each restaurant in the list and see the address, the phone number, the last inspection date and the problems found during the inspection! 👏

3) The solution is 🥁... [**The Big Apple Orchard Search**](https://cryptic-eyrie-45126.herokuapp.com/all)

## The Geek stuff 🤓

The project has been developed with React using hooks and it has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br/>

For simplicity, faster development and to have a responsive web app out-of-the-box I have decided to use the [*Bootstrap*](<https://github.com/react-bootstrap/react-bootstrap>) library.

From a technical point of view, the *Papaya* is just a stripped down version of the *Big Apple*.
The react router instantiates two different components (`Thai` for the `/` route and `General` for the `/thai`) which return a common component (`Common` 😒) with different props (for the Thai version, the cuisine and the minimum grade inputs are hidden and fixed).<br/>
The `Common` component holds the logic for fetching the restaurants.<br/>
It uses some other custom components:

- `Header`: just a graphical header

- `RestaurantsForm`: the search criteria form. It also loads all the available cuisines from the API for the *Big Apple* version

- `Loading`: a simple spinner

- `RestaurantsList`: the results list. It also provides controls for the number of results per page, the order and the pagination, which is implemented in the `ListPagination` component.

- `RestaurantModal`: the modal with the restaurant details. It can be opened clicking one of the results in the list. The details are fetched and displayed by the `RestaurantDetails` component.

To run it locally you can use `npm start` and open [http://localhost:3000](http://localhost:3000) in the browser.

To run the test, of course, `npm test`.
