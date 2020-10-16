# Template for deploying vue2 on heroku

## To clone it to your machine

```
git clone https://github.com/IbrahemAtef/deployHerokuForVue.git
```

## To Run it locally

### First you need to install the node_modules, Follow these stips:

#### Open the terminal in the root file and then run

```
npm i
```

#### Then run

```
cd backend
```

#### Then run

```
npm i
```

#### Then return to the root

```
cd ..
```

### Second to run the server-side and the client-side, Follow these stips:

#### Open the first terminal in the root file and then run

```
npm start
```

#### Open the second terminal in the root file and then run

```
npm run serve
```

## To deploy it in heroku

### First you need to login to heroku so run

```
heroku login
```

### Second you need to create an app on heroku so run

```
heroku create
```

### Third you need to add buildpacks:add heroku/nodejs, so run

```
heroku buildpacks:add heroku/nodejs
```

### Fourth you need to add another buildpacks, so run

```
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static
```

### Finally push to heroku

```
git push heroku master
```
