Project Imber
=============

A [Meteor](http://meteor.com) app for controlling a home sprinkler system.

By itself this app won't do much as it requires a second part which lives at the repo
[Imber Remote](http://github.com/jamesmacfie/imber-remote). This second part also requires
a bit of hardware which is documented in the repo's readme.

## Installation

You'll want meteor installed on your system
```
curl https://install.meteor.com | sh
```

Grab the code
```
git clone http://github.com/jamesmacfie/imber
cd imber
```

Install required packages
```
meteor add iron-router
meteor add sacha:spin
```

Run the app (will load up ou http://localhost:3000)
```
meteor
```

## Deployment

#### Web
This deployment assumes you want to deploy your app to meteor's servers.
```
meteor deploy my_app_name.meteor.com
```

If you want to deploy this to another server you can use xxx (disclaimer: I haven't tried
this so I don't know if there are issues).

You'll probably also want this on your phone.

#### For Android
```
meteor install-sdk android
meteor add-platform android
meteor run android-device --mobile-server my_app_name.meteor.com
```

#### For iOS
```
meteor install-sdk ios
meteor add-platform ios
meteor run ios-device --mobile-server my_app_name.meteor.com
```

## Connecting this with Imber Remote

When you run Imber locally on your machine (via the `meteor` command) then running Imber
Remote should "just work". When you deploy this to `my_app_name.meteor.com` then you''ll need to
update the ddp reference [here](https://github.com/jamesmacfie/imber-remote/blob/master/sprinkler.js#L16) to match your deployment address.

## Todo

Check out the [Github issues](http://github.com/jamesmacfie/imber/issues) to see what still needs
to be done. For the most part time project works but there are quite a few pieces to be done to
make it as awesome as it can be.
