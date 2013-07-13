for b in 'webcommand-app' 'sorter' 'awker' 'seder'
do
    git checkout $b
    git push -f $b $b:master
done
