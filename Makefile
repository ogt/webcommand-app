TAP=node_modules/.bin/tap
LINT=node_modules/.bin/jshint
CREATE=scripts/createapps.sh
DEPLOY=scripts/deployapps.sh
REFRESH=scripts/refreshbranches.sh
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

