class Notification {
	constructor(personImageUrl, text, timeAgo, status, bonusImageUrl, privateMessageText) {
		this.personImageUrl = personImageUrl;
		this.text = text;
		this.timeAgo = timeAgo;
		this.status = status;
		this.bonusImageUrl = bonusImageUrl;
		this.privateMessageText = privateMessageText;
	}
	
	GenerateNotificationElement() {
		// TODO: There must be a better way than this
		// could React.js be used here?
		var notificationElement = document.createElement("div");
		notificationElement.classList.add("Notification");
		notificationElement.dataset.status = this.status;
		
		var colGroups = '<colgroup>';
		var content = '<tbody><tr>';
		
		colGroups += '<col span="1" style="width: 90px">';
		content += '<td>'
						+'<image class = "NotificationContent" src=' + this.personImageUrl + ' />'
					+'</td>';
		
		colGroups += '<col span="1" style="width: 100%">'
		content += '<td>'
							+'<div class = "NotificationContent" />'
								+'<p>' + this.text + '<span class="unreadDot"></span></p>'
								+'<p>' + this.timeAgo + '</p>'
							+'</div>'
						+'</td>';
		
		if (this.bonusImageUrl != null) {
			colGroups += '<col span="1" style="width: 90px">'
			content +='<td>'
					+ '<image src=' + this.bonusImageUrl + ' class="bonusImage" />';
				+ '</td>';
		}
		
		colGroups += '</colgroup>';
		content +='</tr>';
		if (this.privateMessageText != null) {
			content += '<tr>'
				+ '<td></td>'
				+ '<td>'
					+'<div class = "privateMessageText">'
						+this.privateMessageText;
					+'</div>'
				+ '</td>'
				+ '</tr>';
		}
		content +='</tbody>';

		var innerHtml =
				  '<table style="width:100%">'
					+colGroups
					+content
					+'</table>';

		notificationElement.innerHTML = innerHtml;
		return notificationElement;
	}
}

function bodyOnLoad() {
	var notificationItemsElement = document.getElementsByClassName("NotificationItems")[0];
	
	var notifications = RetrieveNotifications();
	for (var i = 0; i < notifications.length; i++) {
		notificationItemsElement.appendChild(notifications[i].GenerateNotificationElement());
	}
	UpdateUnreadNotifications();
}

function MarkAllAsRead() {
	var notifications = document.getElementsByClassName("Notification");
	for (var i = 0; i < notifications.length; i++) {
		notifications[i].dataset.status = "read";
	}
	UpdateUnreadNotifications();
}

function UpdateUnreadNotifications() {
	var notifications = document.getElementsByClassName("Notification");
	var count = 0;
	for (var i = 0; i < notifications.length; i++) {
		if (notifications[i].dataset.status === "unread") {
			count += 1;
		}
	}
	var unreadNotificationsLabel = document.getElementById("NumberOfUnreadNotifications");
	unreadNotificationsLabel.innerHTML = count.toString();
}

function RetrieveNotifications() {
	// TODO: I guess these would be retrieved from some server or something, but I'm just gonna hard-code them in the JS file here
	var markWebberElement = new Notification('assets//images//avatar-mark-webber.webp', 
		'<span class="Name">Mark Webber</span> reacted to your recent post <span class="PostName">My first tournament today!</span>',
		'2m ago',
		'unread');
	var angelaGrayElement = new Notification('assets//images//avatar-angela-gray.webp',
		'<span class="Name">Angela Gray</span> followed you',
		'5m ago',
		'unread');
	var jacobThompsonElement = new Notification('assets//images//avatar-jacob-thompson.webp',
		'<span class="Name">Jacob Thompson</span> has joined your group <span class="GroupName">Chess Club</span>',
		'1 day ago',
		'unread');
	var rizkyHasanuddinElement = new Notification('assets//images//avatar-rizky-hasanuddin.webp',
		'<span class="Name">Rizky Hasanuddin</span> sent you a private message',
		'5 days ago',
		'read',
		null,
		"Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game");
	var kimberlySmithElement = new Notification('assets//images//avatar-kimberly-smith.webp',
		'<span class="Name">Kimberly Smith</span> commented on your picture',
		'1 week ago',
		'read',
		'assets//images//image-chess.webp');
	var nathanPetersonElement = new Notification('assets//images//avatar-nathan-peterson.webp',
		'<span class="Name">Nathan Peterson</span> reacted to your recent post <span class="PostName">5 end-game strategies to increase your win rate</span>',
		'2 weeks ago',
		'read');
	var annaKimElement = new Notification('assets//images//avatar-anna-kim.webp',
		'<span class="Name">Anna Kim</span> left the group <span class="GroupName">Chess Club</span>',
		'2 weeks ago',
		'read');
	return [markWebberElement, angelaGrayElement, jacobThompsonElement, rizkyHasanuddinElement, kimberlySmithElement, nathanPetersonElement, annaKimElement];
}