for b in "$@"
do
    git checkout $b
    git push -f $b $b:master
done
git checkout master
