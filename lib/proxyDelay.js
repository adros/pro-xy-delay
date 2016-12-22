var logger;
var Promise = require("bluebird");

function init(_proxy, _logger) {
	logger = _logger;
}

function exec(config, req, res) {

	var delayConfig = config["pro-xy-delay"];
	if (!delayConfig || delayConfig.disabled) {
		logger.trace(`Delay plugin not enabled (${req.url})`);
		return;
	}

	var rules = delayConfig.rules;
	if (!rules || !rules.length) {
		logger.trace(`No rules defined (${req.url})`);
		return;
	}

	var delay = rules.reduce(function(delay, rule) {
		if (rule.disabled || !new RegExp(rule.urlPattern).test(req.url)) {
			return delay;
		}

		logger.trace(`Url matched "${req.url}"`);

		return delay + rule.delay;
	}, 0);

	if (delay) {
		req.headers["x-pro-xy-delay"] = delay;
		res.setHeader("x-pro-xy-delay", delay); //set to both, will be pluged after ws-api, which will send headers before this
		return Promise.delay(delay, false);
	}
}

module.exports = {
	init,
	exec
};
