TAP=node_modules/.bin/tap
LINT=node_modules/.bin/jshint

refresh:
	$(REFRESH)

deploy:   refresh
	$(DEPLOY)

test:   lint
	$(TAP) test/*.js

lint:
	$(LINT) index.js
	$(LINT) test/*.js
  
