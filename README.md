# Webcomic Site Template (Instructions still on going)

## What is it?

A free webcomic template, with instructions on how to set it up (yes, you will have to touch some code, but I'm going to try and make this easy for you).

Built using the static site generator, [Eleventy](https://www.11ty.io/) and using [Netlify CMS](https://www.netlifycms.org/) for the web interface to upload. Hosted on [Netlify], making this site mostly free to maintain except for a domain.

Use it as a starter for your own webcomic.

Based on the [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) repo.

## [Demo Site](https://keen-newton-74c4ac.netlify.app/)

## Instructions

### Github account
First thing's first. You're going to need a [Github account](https://github.com/). Github is a bit of a complicated thing to explain, but [here's an article if you want to delve into it](https://www.howtogeek.com/180167/htg-explains-what-is-github-and-what-do-geeks-use-it-for/). For **our purposes** Github is the place where we will be storing the code and files that will make up your webcomic site, and what we'll use to do some necessary edits for it in the beginning.

Github uses something called version control, which means as you make changes a history of older versions of the site is maintained. SO, if you feel like you've horribly messed up something, there's a way to hit that CTRL Z/undo button, so to speak.

Anyways, go create your account and then come back here.

### Deploy the site!

Hit this button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/katedee/eleventy-netlify-webcomic)

Clicking the button above will deploy a copy of the demo website to your Netlify
account (you will also create an account during this process)
and everything needed for running the site.

### Setup authentication

After deploying this project, Netlify Identity will add you as a CMS user and
will email you an invite. It is not necessary to accept this invite if you wish
to use an
[OAuth provider](https://www.netlify.com/docs/identity/#external-provider-login)
(e.g. Github) to manage authentication for your CMS.
It is recommended to use this method of authentication as it removes the need
for an email & password to log in to the CMS and is generally more secure. You
will need to add an OAuth provider in your Netlify app settings under
"Settings" > "Identity" > "External providers".

Once you've added an OAuth provider, navigate to `/admin` on your site, select your provider from the
list, and you should then be logged into your CMS. Cool huh?

Now you're all set, and you can start editing content!

### Update your site information
Buckle up, we're going to touch some code, but hopefully it won't be too painful. Head to your github account. Click your icon in the top right, go to "your repositories", and then click on the repository for you webcomic site.

Click on the folder called `_data`, and click the file name `metadata.json`.

From here, hit the pencil/edit icon on the right.

It's important here that you maintain the double quotes. Go ahead and update the title, author name and email.
Then, under feed, update the subtitle with a tagline about your comic, and the ID with your website url (you can grab the one from netlify for now, and update later with a custom domain).

Under `social` you can see a list of a couple social media websites, and a website link. Under these, update only the `link` portion, placing your link in between the quotation marks. IF you do not want a particular link to show, just leave it blank. Leave the RSS link, as this is automatically generated :)

When you're done editing, make a quick sentence or two on what you updated in the commit decription field at the bottom of the page and hit "commit" (basically "publish")

Congrats, you're a web developer now 😎

### Adding content
Okay, enough faffing about in the code. Let's head back to Netlify and over the admin portion of our website. If you have trouble finding it it's usually just your site url with `/admin` added at the end. 

From here, once you're logged in, you can see a few categories on the left:
- post
- page
- webcomic
- cast

let's tackle these one at a time.

#### post
This is the BLOG only portion of your site, seperate from your comic updates (what you see when you press the blog link). You can go here, hit `new post`, and create a blog post about whatever you want.

#### page
This is for managing and handling the pages that are built into your site (aside from the blog and webcomic). So basically the things that will appear in the top navigation bar of your website. You can edit these pages, but you do not have the ability to create new ones. I don't recommend deleting pages, as you can hide pages if you don't want them to show.

**Hiding Pages**
Pages can be hidden, by going clicking on the page, and under `Navigation`, changing the order number to either `0` or a negative number like `-1` (The 'About Us' page is currently hidden, and you can unhide this if you'd like to have an about page). This is also where you can adjust the order that links appear in the navigation based on the number you assign them (where 1 will be first in the navigation, 2 will be second, etc.). If two or more items are set to the same number, it will sort alphabetically between them.

**Home, Archive, and Blog**
The Home, Archive and Blog pages can be mostly left alone, unless you want to hide them or change the navigation order (explained later). 

**Website and Store**
Website and Store exist solely to input your portfolio and store link, respectively. You can update the links by clicking on the page, and updating `Link`, under `Navigation` (currently with a default `example.com`). These links can also be hidden.

**Cast**
Here you would just put the intro text for your cast page, but not the actual cast characters (we will talk about where to do this later). If you want no preamble before showing the list of chracters, simple delete the text in the 1body1 field and hit save. 

**Links**
A page to list any links I may have forgotten and that you may want to have here ✨

#### cast
Click `Cast` in the left hand menu, and then `Cast Page`. Don't worry about the preview saying there's an error. The preview function here has it's limitations and unfortunately won't function here. 

The cast page is pretty straight forward. You click `Add Character` to add a new character, and then upload an image, fill out the alt text field (this is what is read by screen readers), the character name and description fields and hit save once you're done adding all your characters. If you don't want this page to show, go back to `Pages` -> `Cast` and set the `Order` to `0` or `-1`.

#### webcomic
Finally, we're adding some comics! To add a new page, you will `webcomic` in the lefthand menu, and then `New webcomic`. Upload an image, fill out the alt text (alt text helps visually impaired users navigate your site. [Check out this link to learn about creating alt text for comic pages](https://lastcallmedia.com/blog/accessible-comics)), title, and body (the body is text that will show up underneath your page).

### Congrats, you've got a functional webcomic website!
From now on, for posting, you're mostly just going to access through your admin page on the browser, unless you're looking to do some fancy things like 💅 style your site ✨

(TODO: write about web styling)

## Some other info:

## Gotchas

If you change the repo that was created at deploy time from public to private, you'll need to regenerate your token,
as the token generated using the deploy to Netlify button can only access public repositories. To
regenerate your token, head to "Settings" in your Netlify site dashboard, go to the "Identity"
section, then scroll to "Services" where you'll see an "Edit settings" button. Click that and you'll
see a text link to "Generate access token in GitHub".

If you need any help with setting up Netlify CMS, you can reach out to the Netlify team in the [Netlify CMS Gitter](https://gitter.im/netlify/netlifycms).

## Local development

### 1. Clone this repository:

```
git clone https://github.com/danurbanowicz/eleventy-netlify-boilerplate.git my-blog-name
```


### 2. Navigate to the directory

```
cd my-blog-name
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies locally

```
npm install @11ty/eleventy
```

### 4. Edit _data/metadata.json

This file contains your site title and author details, and can be used to store any other commonly used site data.

### 5. Run Eleventy (builds the site)

```
npx @11ty/eleventy
```

Or build automatically when a template changes:
```
npx @11ty/eleventy --watch
```

Or in debug mode:
```
DEBUG=* npx @11ty/eleventy
```

## Bug reports, feature requests, etc

This is an ongoing project and I welcome contributions and suggestions! Feel free to submit a PR.

If you need any help with setting up Netlify CMS, you can reach out to the Netlify team in the [Netlify CMS Gitter](https://gitter.im/netlify/netlifycms).
