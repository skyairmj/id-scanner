FROM node:4.8.0-alpine
MAINTAINER Ming Jin <skyairmj@gmail.com>

ARG user=app
ARG group=app
ENV APP_HOME /var/app_home
RUN addgroup -S ${group} && adduser -S -D -s /bin/sh -h $APP_HOME ${usser} ${group}

EXPOSE 3000

COPY . $APP_HOME
RUN chown -R ${user} $APP_HOME

USER ${user}
WORKDIR $APP_HOME
RUN npm install && bin/bower install && bin/gulp vendor && mkdir -p uploads

USER root
ENV NODE_ENV production
CMD ["npm", "start"]
