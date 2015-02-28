addLoadEvent(function() {
	var menu = document.getElementById('menu')
	submenuList = directChildren(menu, 'li')
	
	addYearDropdown()
	addFocusTrackingToMenu()
	
	function addYearDropdown() {
		var dropdown = document.createElement('select')
		
		var initialOption = document.createElement('option')
		initialValue = 'Year'
		var initialText = document.createTextNode(initialValue)
		initialOption.appendChild(initialText)
		dropdown.appendChild(initialOption)
		
		for (var year = 2014; year >= 1981; year--) {
			var option = document.createElement('option')
			var text = document.createTextNode(year)
			option.appendChild(text)
			dropdown.appendChild(option)
		}
		
		var submenu = document.getElementById('menu-shows').getElementsByTagName('ul')[0]
		var menuItem = document.createElement('li')
		menuItem.appendChild(dropdown)
		submenu.insertBefore(menuItem, document.getElementById('menu-statistics'))
		
		submenu.onchange = function() {
			if (dropdown.value != initialValue) {
				location.href = '/shows/' + dropdown.value;
			}
		}
	}
	
	function addFocusTrackingToMenu() {
		var submenu
		for (
			var submenuIndex = 0;
			submenu = submenuList[submenuIndex];
			submenuIndex++
		) {
			addFocusTrackingToSubmenu(submenu)
		}
	}
	
	function addFocusTrackingToSubmenu(submenu) {
		var childList = submenu.getElementsByTagName('*')
		var child
		for (
			var childIndex = 0;
			child = childList[childIndex];
			childIndex++
		) {
			addFocusTrackingToChild(child, submenu)
		}
		
		submenu.hasFocus = function() {
			var childList = submenu.getElementsByTagName('*')
			var child
			for (
				var childIndex = 0;
				child = childList[childIndex];
				childIndex++
			) {
				if (child.hasFocus()) {
					return true
				}
			}
			return false
		}
		
		submenu.onmouseover = function() {
			submenu.className = 'over'
		}
		
		submenu.onmouseout = function() {
			if (!submenu.hasFocus()) {
				submenu.className = 'out'
			}
		}
	}
	
	function addFocusTrackingToChild(child, submenu) {
		child.onfocus = function() {
			this.focused = true
			submenu.className = 'over'
		}
		
		child.onblur = function() {
			this.focused = false
			submenu.className = 'out'
		}
		
		child.hasFocus = function() {
			return this.focused
		}
	}
	
	function directChildren(parent, wantedTagName) {
		var childList = parent.childNodes
		var wantedChildList = []
		var child
		for (
			var childIndex = 0;
			child = childList[childIndex];
			childIndex++
		) {
			if (child.nodeType == 1 /*Node.ELEMENT_NODE*/ && child.tagName.toLowerCase() == wantedTagName) {
				wantedChildList.push(child)
			}
		}
		return wantedChildList
	}
})
