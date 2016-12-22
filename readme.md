# pro-xy-delay

Plugin for url-replace, that allows to postpone request for certain time.

It can be used to simulate slow server response.

Sample configuration

```
{
    "port": 8000,
    "logLevel": "INFO",
    "plugins": [
        "pro-xy-delay"
    ],
    "pro-xy-delay": {
		"disabled": false,
		"rules": [
			{
				"urlPattern": ".*",
				"delay" : 2000,
				"disabled" : false
		    }
		]
	}
}
```

- *urlPattern* - only requests with matching URL will be modified
- *delay* - time in ms to postpone request
- *disabled* - disable this rule
