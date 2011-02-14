$(document).ready(function(){
        var m2 = Monde("run", 100,100); 
        var c55 = Cellule(50,50); 
        c55.power = 1;
        //m2.run();
		m2.add(c55); 
		
        module("module2", {
            setup: function() {
                $("#canvas svg").remove()
            },
            teardown: function() {}
        });

        test("Le monde s'affiche", function() {
            var m = Monde("canvas", 100, 100);

            equals($("#canvas").find("svg").size(), 1)
        });

        test("On affiche une cellule", function() {
            var m = Monde("canvas", 100, 100);
            var c = Cellule(50, 50)

            m.add(c);
			m.draw();

            ok($("#canvas svg circle").size());
        });

        test("Une cellule en attaque un autre", function() {
            var m = Monde("canvas", 100, 100);
            var c = Cellule(50, 50);
            c.power = 1000
            var c2 = Cellule(75, 75);
            m.add(c);
            m.add(c2);

            c.attaque(c2);
			m.draw();

            equals($("#canvas svg path").size(), 1);
        });

        test("La puissance est affichée", function() {
            var m = Monde("canvas", 100, 100);
            var c = Cellule(50, 50);
            c.power = 1000

            m.add(c);
			m.draw();

            equals($("#canvas svg text").text(), "1000");
        });

        test("Une cellule pas assez puissante pour attaquer", function() {
            var m = Monde("canvas", 100, 100);
            var c = Cellule(50, 50);
            c.power = 1
            var c2 = Cellule(75, 75);


            m.add(c);
            m.add(c2);

            c.attaque(c2)

            equals($("#canvas svg path").size(), 0);

        })

        test("Les cellules gagnent en puissance avec le temps", function() {
            var m = Monde("canvas", 100, 100);
            var c = Cellule(50, 50);
            c.power = 1

            m.add(c);
            m.nextFrame();

            equals(c.power, 2);

        })

        test("l'affichage de la puissance de la cellule est mise à jour avec le temps", function() {
            var m = Monde("canvas", 100, 100);
            var c = Cellule(50, 50);
            c.power = 2
            m.add(c)
            m.nextFrame()
            equals($("#canvas svg text").text(), "3");
            equals($("#canvas svg text").size(), 1);
        })

        test("l'affichage de la puissance de 2 cellule est mise à jour avec le temps", function() {
            var m = Monde("canvas", 100, 100);
            var c = Cellule(50, 50);
            var c2 = Cellule(80,80);
            c.power = 2
            c2.power = 500
            m.add(c)
            m.add(c2)
            m.nextFrame()
            equals($("#canvas svg text").first().text(), "3");
            equals($("#canvas svg text").last().text(), "501");
            equals($("#canvas svg text").size(), 2);
        })

        test("Une cellule attaquée décroit", function() {
            var m = Monde("canvas", 100, 100);
            var attaquant = Cellule(1, 1);
            var loser = Cellule(1, 2);
            attaquant.power = 250;
            loser.power = 11;
            m.add(attaquant);
            m.add(loser);
            attaquant.attaque(loser);

            m.nextFrame()

            equals(loser.power, 10)
        })

        test("Le chemin avance d'une case par unité de temps", function() {
            var m = Monde("canvas", 100, 100);
            var attaquant = Cellule(50, 50);
            var loser = Cellule(80,80);
            attaquant.power = 250;
            loser.power = 11;
            m.add(attaquant);
            m.add(loser);
            attaquant.attaque(loser);

        })

        test("Lorsque le temps avance, le monde evolue", function() {
            var m = Monde("canvas", 100, 100);

            m.nextFrame()

            ok(false);

        })

    });
