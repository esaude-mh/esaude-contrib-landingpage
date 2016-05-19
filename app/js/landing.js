/**
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
import jquery from 'jquery';

const TITLE = 'eSaude Apps';
let apps;

const loadApp = (e) => {
  const icons = jquery('.icon-row').children();
  const app = apps.filter(function( obj ) {
    return obj.id == e.target.id;
  });

  jquery('#description').fadeOut(200);
  jquery('#title').fadeOut(200);

  for(let i = 0; i < icons.length; i++) {
    setTimeout(function(){ jquery(icons[i]).addClass('animated fadeOutDown') }, i*100);
    jquery(icons[i]).unbind('mouseleave');
  }

  window.location = app[0].url;
};

const revealTitle = (value) => {
  jquery('#title').hide();
  jquery('#title').html(value);
  jquery('#title').fadeIn(200);
};

const revealDescription = (app) => {
  jquery('#description').hide();
  jquery('#description').html(
    '<h2>' + app.description + '</h2>' +
      '<div class="credentials">' +
        '<table>' +
          '<tr>' +
            '<td><div class="credential-label">Username: </div></td>' +
            '<td><div class="credential-value">' + app.credentials.username + '</div></td>' +
          '</tr>' +
          '<tr>' +
            '<td><div class="credential-label">Password: </div></td>' +
            '<td><div class="credential-value">' + app.credentials.password + '</div></td>' +
          '</tr>' +
        '</table>' +
      '</div>');
  jquery('#description').fadeIn(200);
};

const hideDescription = () => {
  jquery('#description').fadeOut(200);
};

const showInfo = (e) => {
  const app = apps.filter(function( obj ) {
    return obj.id == e.target.id;
  });

  revealTitle(app[0].title);
  revealDescription(app[0]);
};

const hideInfo = () => {
  revealTitle(TITLE);
  hideDescription();
};

const addApps = (data) => {
 data.apps.map((e)  => {
   jquery('.icon-row').append('<img class="img-circle" src="' + e.icon + '"/ id="' + e.id + '">');
   jquery('#' + e.id).mouseenter(showInfo);
   jquery('#' + e.id).mouseleave(hideInfo);
   jquery('#' + e.id).click(loadApp);
 });

  apps = data.apps;
};

const init = () => {
  // setup container
  jquery('body').append('<div class="container"><div class="title-container"><div id="title" class="title animated fadeIn">' + TITLE + '</div></div><div class="icon-row"></div><div class="description-container"><div id="description" class="description"></div></div></div>');

  // list apps from json file
  jquery.getJSON('apps.json', addApps);

  jquery(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload()
    }
  });
};

jquery(init);
