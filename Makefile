TAP=node_modules/.bin/tap
LINT=node_modules/.bin/jshint
CREATE=scripts/createapps.sh
LINK=scripts/linkapps.sh
DEPLOY=scripts/deployapps.sh
REFRESH=scripts/refreshbranches.sh
BRANCHES= webcommand-app seder awker sorter

link:
	$(LINK) $(BRANCHES)
	
create:
	$(CREATE) $(BRANCHES)
	
refresh:
	$(REFRESH) $(BRANCHES)

deploy:   refresh
	$(DEPLOY) $(BRANCHES)

test:   lint 
	set -e; for f in test/*.sh ; do echo executing $$f; $$f ; done

lint:
	$(LINT) index.js

