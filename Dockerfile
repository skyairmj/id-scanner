FROM node:4.8.0-alpine
MAINTAINER Ming Jin <skyairmj@gmail.com>

# ARG user=app
# ARG group=app
ENV APP_HOME /var/app_home
ENV NODE_ENV production
# RUN addgroup -S ${group} && adduser -S -D -s /bin/sh -h $APP_HOME ${usser} ${group}

EXPOSE 3000
VOLUME ["$APP_HOME/uploads"]
ENTRYPOINT ["npm", "start"]

COPY . $APP_HOME
# RUN chown -R ${user} $APP_HOME

WORKDIR $APP_HOME
RUN npm install --production
