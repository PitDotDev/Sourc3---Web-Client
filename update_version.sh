#!/bin/bash

REGEX="Sourc3(\-?([a-z]*))@([0-9]+\.[0-9]+\.[0-9]+)"
OUTPUT=$(npm list | grep Sourc3*)
MANIFEST="src/manifest.json"
REVISION=$(git rev-list HEAD --count)

if [[ $OUTPUT =~ $REGEX ]]; then
	VERSION="${BASH_REMATCH[3]}.$REVISION"
	echo -n $VERSION > version.gen
	sed "s/%SOURC3_VERSION%/$VERSION/" $MANIFEST.in > $MANIFEST.tmp;
fi

SUFFIX=${BASH_REMATCH[1]}
NETWORK=${BASH_REMATCH[2]}
echo -n $SUFFIX > suffix.gen

if [[ $NETWORK != '' ]]; then
	NETWORK=" ($NETWORK)"
fi

sed "s/%BEAM_NETWORK%/$NETWORK/" $MANIFEST.tmp > $MANIFEST;

rm $MANIFEST.tmp
