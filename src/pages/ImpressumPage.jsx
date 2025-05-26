import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Constants used by ImpressumPage
// Ideally, move these to a shared constants.js file and import them
const subpageContentPaddingStyle = {
    paddingTop: `calc(var(--nav-obstruction-height, 70px) - 2.5rem)`,
    paddingBottom: '2rem'
};

const ImpressumPage = () => (
    <div className="min-h-screen flex flex-col text-gray-800">
        <div
            className="flex-grow flex flex-col items-start w-full px-4 sm:px-6 lg:px-8"
            style={subpageContentPaddingStyle}
        >
            <div className="max-w-3xl w-full mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-left">
                    Impressum
                </h1>
                <div className="space-y-4 text-sm md:text-base text-gray-700 text-left">
                    <section className="mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Angaben gemäß § 5 TMG</h2>
                        <p>Mauris GbR<br />
                            Saalfelderstraße 11<br />
                            72622 Nürtingen</p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Vertreten durch die Gesellschafter</h2>
                        <p>Maurice Mundi<br />
                            Marius Hopp</p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Kontakt</h2>
                        <p>E-Mail: contact@mm-solutions.studio</p>
                        {/* <p>Telefon: [Hier Telefonnummer einfügen, falls gewünscht]</p> */}
                    </section>

                    {/* <section className="mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Umsatzsteuer-ID</h2>
                        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                        [Hier USt-IdNr. einfügen, falls vorhanden]</p>
                    </section> */}

                    <section className="mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                        <p>Maurice Mundi</p>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Haftungsausschluss (Disclaimer)</h2>
                        <h3 className="text-md sm:text-lg font-semibold text-gray-700 mt-3 mb-1">Haftung für Inhalte</h3>
                        <p className="text-xs sm:text-sm">
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                        </p>
                        <h3 className="text-md sm:text-lg font-semibold text-gray-700 mt-3 mb-1">Haftung für Links</h3>
                        <p className="text-xs sm:text-sm">
                            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                        </p>
                        <h3 className="text-md sm:text-lg font-semibold text-gray-700 mt-3 mb-1">Urheberrecht</h3>
                        <p className="text-xs sm:text-sm">
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                        </p>
                    </section>
                    <p className="mt-8 text-xs text-gray-500">
                        Dieses Impressum wurde mit Hilfe von Vorlagen erstellt. Für eine vollständige Rechtssicherheit empfiehlt es sich, das Impressum
                        von einem Rechtsanwalt prüfen zu lassen.
                    </p>
                </div>
            </div>
        </div>
        <div className="text-center py-4 sm:py-6">
            <RouterLink to="/" className="px-5 py-1.5 sm:px-6 sm:py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-xs sm:text-sm md:text-base">
                Zurück zur Startseite
            </RouterLink>
        </div>
    </div>
);

export default ImpressumPage;