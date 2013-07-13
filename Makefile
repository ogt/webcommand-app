TAP=node_modules/.bin/tap
LINT=node_modules/.bin/jshint
CREATE=bin/createapps.sh
DEPLOY=bin/deployapps.sh
REFRESH=bin/refreshbranches.sh
BRANCHES= webcommand-app seder awker sorter

create:
	$(CREATE) $(BRANCHES)
	
refresh:
	$(REFRESH) $(BRANCHES)

deploy:   refresh
	$(DEPLOY) $(BRANCHES)

test:   lint
	$(TAP) test/*.js

lint:
	$(LINT) index.js
	$(LINT) test/*.js

