for b in 'webcommand-app' 'sorter' 'awker' 'seder'
do
    git checkout $b
    git rebase master
done
