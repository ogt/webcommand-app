
for b in "$@"
do
    git remote add $b git@heroku.com:$b.git
done

# at this point you will also need to update a couple files in each branch:
#  - app specific command.js list of commands - assuming that is branch corresponds to a server that 
#        serves a specific set of commands
#  - set the branch var in index.html to the branch name so as the fork me points correctly 
