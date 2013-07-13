TAP=node_modules/.bin/tap
LINT=node_modules/.bin/jshint
REFRESH=bin/refreshbranches.sh
DEPLOY=bin/deploybranches.sh
BRANCHES= webcommand-app seder awker sorter

refresh:
	$(REFRESH) $(BRANCHES)

deploy:   refresh
	$(DEPLOY) $(BRANCHES)

test:   lint
	$(TAP) test/*.js

lint:
	$(LINT) index.js
	$(LINT) test/*.js

