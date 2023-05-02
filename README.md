### Table Of Content

(click to navigate between different block (navigation will work on **[notion version](https://www.notion.so/Weather-app-Documentation-4d6ec5138153408a85e244fad1a70eb3)**, not in PDF))

- [Links](https://www.notion.so/Weather-app-Documentation-4d6ec5138153408a85e244fad1a70eb3)
- [Detailed Description.](https://www.notion.so/Weather-app-Documentation-4d6ec5138153408a85e244fad1a70eb3)
- [Overall test coverage](https://www.notion.so/Weather-app-Documentation-4d6ec5138153408a85e244fad1a70eb3)
- [Redux Version](https://www.notion.so/Weather-app-Documentation-4d6ec5138153408a85e244fad1a70eb3)
- [How to Use](https://www.notion.so/Weather-app-Documentation-4d6ec5138153408a85e244fad1a70eb3)
- [Commands](https://www.notion.so/Weather-app-Documentation-4d6ec5138153408a85e244fad1a70eb3)

---

### Links➖

Link 1:-  [https://shivam-gateway-weather-app.netlify.app/](https://shivam-gateway-weather-app.netlify.app/)  ***(main branch)***

Link 2:- [https://shivam-gateway-weather-app-v2.netlify.app/](https://shivam-gateway-weather-app-v2.netlify.app/)  (with addon feature and code migrated to redux toolkit)   ***(MigrationRedux branch).***

Github Link➖ [https://github.com/shivamsingh6131/weather_app](https://github.com/shivamsingh6131/weather_app)

---

### Detailed Description➖

I have used pure JavaScript *functional programming* in this Assignment to *showcase how much understanding I have of pure React and Javascript without depending on any state management library*. Functional programming emphasizes the use of functions to create programs. In functional programming, functions can be *passed around just like any other value*.

To make my code more modular and maintainable, I have created and *used helper functions*. Helper functions perform a specific task, So by *encapsulating complex logic in helper functions*, I have been able to make my ***code more modular, and easier to read and maintain***.

Finally, I have used functional programming in conjunction with React by *passing setter functions as arguments to my helper functions*. By doing all the business logic with helper functions, I have been able to keep my ***React components clean and focused on rendering***.

I*t might take a little more effort to understand and implement at first* also managing the state is hard as you need to pass the state in several nested components and the helper function but it is *essential technique for working on complex projects*.

In the deployed version of the React application, I have *disabled the use of developer tools*, which is considered good practice in production environments. Additionally, I have written *unit test cases* for both the helper functions and React components, with an overall *coverage of more than 80%* for all criteria. By ensuring comprehensive test coverage and disabling developer tools, *I have improved the stability, security, and performance of the application*, which is critical in a production environment.

Also, I’ve added one ***script*** if you don’t have node and npm installed in your local machine you can just *run that script and that will install node and npm* both.

---

### Overall test Coverage➖

```jsx
---------------------------------|---------|----------|---------|---------|-------------------
File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------------|---------|----------|---------|---------|-------------------
***All files                        |   93.95 |    81.33 |    90.9 |   93.83 |***                   
 src                             |     100 |      100 |     100 |     100 |                   
  App.tsx                        |     100 |      100 |     100 |     100 |                   
 src/components                  |   94.82 |     91.3 |   95.83 |   94.54 |                   
  CityCard.tsx                   |     100 |    92.85 |     100 |     100 | 37                
  CityCardContainer.tsx          |     100 |    83.33 |     100 |     100 | 54                
  CustomCard.tsx                 |   93.33 |    83.33 |   83.33 |   93.33 | 39                
  CustomPopup.tsx                |     100 |      100 |     100 |     100 |                   
  CustomSelect.tsx               |   88.23 |    83.33 |     100 |   88.23 | 34-35             
  CustomTypography.tsx           |     100 |      100 |     100 |     100 |                   
  CustomisedCardContainer.tsx    |     100 |      100 |     100 |     100 |                   
  Header.tsx                     |     100 |      100 |     100 |     100 |                   
  index.ts                       |       0 |        0 |       0 |       0 |                   
 src/pages                       |   84.84 |    42.85 |      80 |   84.37 |                   
  Homepage.tsx                   |   84.84 |    42.85 |      80 |   84.37 | 42-48,58,86       
 src/utils                       |   94.56 |    86.66 |   88.23 |   94.56 |                   
  helper.ts                      |   94.56 |    86.66 |   88.23 |   94.56 | 65-66,105-110,214 
  index.ts                       |       0 |        0 |       0 |       0 |                   
 src/utils/Api                   |     100 |      100 |     100 |     100 |                   
  apiHelper.ts                   |     100 |      100 |     100 |     100 |                   
  index.ts                       |       0 |        0 |       0 |       0 |                   
 src/utils/mock                  |     100 |      100 |     100 |     100 |                   
  CustomTypographyMock.ts        |     100 |      100 |     100 |     100 |                   
  CustomisedCardContainerMock.ts |     100 |      100 |     100 |     100 |                   
  HeaderMock.ts                  |     100 |      100 |     100 |     100 |                   
  cityCardContainerMock.ts       |     100 |      100 |     100 |     100 |                   
  cityCardMock.ts                |     100 |      100 |     100 |     100 |                   
  customCardMock.ts              |     100 |      100 |     100 |     100 |                   
  customSelectMock.ts            |     100 |      100 |     100 |     100 |                   
  helperMock.ts                  |     100 |      100 |     100 |     100 |                   
  homePageMock.ts                |     100 |      100 |     100 |     100 |                   
  index.ts                       |       0 |        0 |       0 |       0 |                   
---------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 12 passed, 12 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        6.969 s
```

---

### Redux Version➖

[https://shivam-gateway-weather-app-v2.netlify.app/](https://shivam-gateway-weather-app-v2.netlify.app/)

I completed the assignment with the test cases way before the submission time so I thought I have used plane react without any state management system (just because I wanted to show I know the basics well without depending on any state management).

So I *migrated the entire code* base to the ***Redux toolkit*** even after that I had time, So I enhanced it to have some add-on functionality.

- Now users can have customized data for all the searched cards as well.
- If the customized tab is enabled then all the city cards will have a button to get it’s own customized data.

Due to migration on Redux, there will be less prop drilling as now frequently shared states will be managed with redux.

In the deployed version of the React with Redux, I have *disabled the use of developer tools for both React as well as Redux on production environment.* 

---

### How to Use➖

- When you visit the page on the first it’ll ask you to provide your location, once you provide your location it will get your current weather data.
- Below the first card, you’ll see **Get Customised Data,** after clicking on it you can access your current location data for many different scenarios.
    - For Today ⇒ all 24 hours
    - For Tomorrow ⇒ all 24 hours
    - For Daily ⇒ till next 15 days. (API limitation)
    - For Weekly ⇒ next 2 weeks. (API limitation)
- Also if you don't want the customized data then you can remove the card by clicking on the Remove Card Button.
- On the top left corner, you can find a search bar, where you can search your desired city.
- Search input has debouncing implemented on it. (This means just like any online platform once you search anything it will take your input and once you stop writing for 2 sec then it will search for that city).
- While searching you’ll have an animation at the bottom to indicate the search in progress.

---

### Commands ➖

To start

```graphql
npm start
```

To run test cases.

```jsx
//for over all
npm run test   

//for perticular file
npm run test -- <filename> 
```

To check test Coverage

```jsx
//for over all
npm run test:coverage  

//for perticular file
npm run test:coverage -- <filename> || <file relative path>
```

To run script

```jsx
//To give necessary permission
chmod +x ./scripts/setup.sh

//To run the script
sh ./scripts/setup.sh

**dummy output**
*setting up required softwares/dependencies
log: Node already installed v16.13.2
log: npm already installed -v9.4.1*
```
