SHELL  := /bin/bash
PATH   := node_modules/.bin:$(PATH)
DIST    = dist
JS      = $(shell find src -name '*.js*' ! -path '*/__tests__/*')

.PHONY: clean test test-watch release

all: package.json README.md LICENSE.md javascript

$(DIST):
	@mkdir -p $(DIST)

%.md: $(DIST)
	cp $@ $^

package.json: $(DIST)
	@node -p 'p=require("./package");p.private=undefined;p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > $(DIST)/package.json

javascript: $(DIST)
	babel -d $^ $(JS)

release: clean all
	npm publish $(DIST)

clean:
	@rm -rf $(DIST)

test:
	NODE_ENV=test karma start --single-run

test-watch:
	NODE_ENV=test karma start

test-cov:
	CONTINUOUS_INTEGRATION=true make test && coveralls < coverage/report-lcov/lcov.info
