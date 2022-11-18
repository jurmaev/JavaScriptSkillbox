function filter(array, filter) {
    var filtered = [];
    for (let email of array) {
        if (!filter.includes(email)) {
            filtered.push(email);
        }
    }
    return filtered;
}

emails =   ['oneiros@yahoo.com',
            'jusdisgi@comcast.net',
            'njpayne@comcast.net',
            'skythe@gmail.com',
            'sjava@verizon.net',
            'dvdotnet@verizon.net',
            'paina@sbcglobal.net',
            'kosact@outlook.com',
            'yenya@comcast.net',
            'quantaman@gmail.com',
            'hauma@optonline.net',
            'earmstro@aol.com',
            'novanet@yahoo.ca',
            'bastian@aol.com',
            'demmel@msn.com',
        ]
blacklist = ['oneiros@yahoo.com', 'novanet@yahoo.ca', 'demmel@msn.com']
console.log(filter(emails, blacklist));