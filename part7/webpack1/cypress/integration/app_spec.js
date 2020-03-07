describe('Blog App', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			name: 'Rex Davinci',
			username: 'rex1',
			password: 'abc123'
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});
	it('front page can be opened', function() {
		cy.contains('Erudite');
	});
	it('does not contain logout', function() {
		expect(cy.should.not.include('Logout')).to.equal(false);
	});

	// it('can open login form', function() {
	// 	cy.contains('Login...').click();
	// 	cy.get('input:first').type('rex1');
	// 	cy.get('input:last').type('abc123');
	// 	cy.get('form').submit();
	// });

	describe('When logged in', function() {
		beforeEach(function() {
			cy.contains('Login...').click();
			cy.get('input:first').type('rex1');
			cy.get('input:last').type('abc123');
			cy.get('form').submit();
		});
		it('shows the name of the user', function() {
			cy.contains('Rex Davinci');
		});

		describe('Creating and deleting blog', function() {
			beforeEach(function() {
				cy.contains('New Blog').click();
				cy.get('#author').type('Anonymous');
				cy.get('#title').type('A new dawn');
				cy.get('#url').type('https://google.com');
				cy.contains('Add').click();
			});
			it('new blog created', function() {
				cy.contains('A new dawn');
			});
			it('newly created blog can be deleted', function() {
				cy.get('.blog-title').click();

				cy.contains('0 likes')
					.get('#del')
					.click();

				cy.contains('blog "A new dawn" deleted');
			});
		});
	});

	// it('a new blog can be created', function() {});
});
