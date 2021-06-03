# holiday-planner

Node.js based class that gives list of holidays in given time frame based on national holiday list of specific country

## How to use

Go to root directory "holiday-planner" and Execute commands with `yarn` or `npm`

### Configurations and installing the dependencies

- If node is not installed then Install [node] (https://nodejs.org/en/download/)
- Note the class "HolidayPlanner" (with private methods) has been implemented based on Node version 14+ so you can install that version.
- If you have older version of node say 13+ or 12+ then just change the private methods definations to lambda functions, it will work
  ` eg: Change #calculateHolidayPeriod(startDate, endDate){ .... } to #calculateHolidayPeriod = (startDate, endDate) => { .... }`
- Run the following command to load all the module dependencies for app:

```bash
yarn
```

Or

```bash
npm install
```

Or

```bash
npm i
```

### To run the application

- Go to `index.js` change the startDate and endDate of the input object.
- Run any of the below commands to execute the module.

```bash
node index.js
```

Or

```bash
yarn start
```

Or

```bash
npm start
```

### To run unit tests

```bash
yarn test
```

Or

```bash
npm test
```

Or

```bash
npm run test
```
