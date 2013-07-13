for b in "$@"
do
    git checkout $b
    git rebase master
done
git checkout master
