describe("Authentication", function () {
    it("should authenticate valid user", function (done) {
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            text: () => Promise.resolve("alice,1234\nbob,passw0rd")
        }));

        fetchUserData().then(users => {
            const valid = users.find(u => u.username === "alice" && u.password === "1234");
            expect(valid).toBeDefined();
            done();
        });
    });

    it("should reject invalid user", function (done) {
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            text: () => Promise.resolve("alice,1234\nbob,passw0rd")
        }));

        fetchUserData().then(users => {
            const valid = users.find(u => u.username === "john" && u.password === "doe");
            expect(valid).toBeUndefined();
            done();
        });
    });
});
