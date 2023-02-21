
export default {
	setValue(key, value) {
		if (typeof value == "object") {
			// 如果是对象，就转字符串存储
			value = JSON.stringify(value)
		}
		return window.sessionStorage.setItem(key, value);
	},
	getValue(key) {
		const data = window.sessionStorage.getItem(key);
		if (data) {
			let value = data;
			if ((data.indexOf('{') === 0 || data.indexOf('[') === 0) && data.indexOf(':') >= 0) {
				// 如果是字符串对象，就转对象
				value = JSON.parse(data)
			}
			return value
		} else {
			return false
		}
	},
	cleanValue(key) {
		window.sessionStorage.removeItem(key);
	}
}