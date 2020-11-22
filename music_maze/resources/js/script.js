/*jslint browser:true */
/*jslint esnext:true */
/*jslint node:false */
/*jslint devel:false */
/*jslint jquery:false*/

class Model {
    constructor() {
        this.DataHandler = undefined;
        this.MusicHandler = {
            music: null,
            spotify: null,
            engine: undefined,
            volume: 0.75,
            timeout: undefined,
            seek: 0,
        };
        //this.debug_extractDummyRecommended(5161533, "radiohead");
        //this.debug_extractDummySearch("creep");
    }

    debug_extractDummyRecommended(code, name) {
        axios({
                "method": "GET",
                "url": "https://shazam.p.rapidapi.com/songs/list-recommendations",

                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "shazam.p.rapidapi.com",
                    "x-rapidapi-key": "72699df91dmsha1384e3aed130dbp169dc7jsnf10719d7bc83",
                    "useQueryString": true
                },

                "params": {
                    "locale": "en-US",
                    "key": `${code}` //5161533 -> Creep
                }
            })
            .then(response => {
                let jsonstr = JSON.stringify(response);
                localStorage.setItem(`${name}`, jsonstr);
                return response;
            })
            .catch(err => {
                console.log(err);
            });
    }

    debug_extractDummySearch(search) {
        axios({
                "method": "GET",
                "url": "https://shazam.p.rapidapi.com/search",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "shazam.p.rapidapi.com",
                    "x-rapidapi-key": "72699df91dmsha1384e3aed130dbp169dc7jsnf10719d7bc83",
                    "useQueryString": true
                },
                "params": {
                    "locale": "en-US",
                    "offset": "0",
                    "limit": "5",
                    "term": `${search}`
                }
            })
            .then(response => {
                let jsonstr = JSON.stringify(response);
                localStorage.setItem(`${search}`, jsonstr);
                return response;
            })
            .catch(err => {
                console.log(err);
            });
    }

    debug_loadDummy(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    //emulates the delay of fetching
    debug_LoadSong(name, delay = 500) {

        return new Promise(
            (resolve, reject) => {

                setTimeout(() => {
                    this.DataHandler = this.debug_loadDummy(name);
                    resolve("Done");
                }, delay);

            }
        );
    }

    process_LoadSong(query, offset = 0) {
        return {
            Search: new Promise((resolve, reject) => {
                axios({
                        "method": "GET",
                        "url": "https://shazam.p.rapidapi.com/search",
                        "headers": {
                            "content-type": "application/octet-stream",
                            "x-rapidapi-host": "shazam.p.rapidapi.com",
                            "x-rapidapi-key": "72699df91dmsha1384e3aed130dbp169dc7jsnf10719d7bc83",
                            "useQueryString": true
                        },
                        "params": {
                            "locale": "en-US",
                            "offset": `${offset}`,
                            "limit": "5",
                            "term": `${query}`
                        }
                    })
                    .then(response => {
                        this.DataHandler = response;
                        resolve("Done");
                    })
                    .catch(err => {
                        reject("Error: ", err);
                    });
            }),

            Recommendations: new Promise((resolve, reject) => {
                axios({
                        "method": "GET",
                        "url": "https://shazam.p.rapidapi.com/songs/list-recommendations",

                        "headers": {
                            "content-type": "application/octet-stream",
                            "x-rapidapi-host": "shazam.p.rapidapi.com",
                            "x-rapidapi-key": "72699df91dmsha1384e3aed130dbp169dc7jsnf10719d7bc83",
                            "useQueryString": true
                        },

                        "params": {
                            "locale": "en-US",
                            "key": `${query}` //5161533 -> Creep
                        }
                    })
                    .then(response => {
                        this.DataHandler = response;
                        resolve("Done");
                    })
                    .catch(err => {
                        console.log(err);
                        reject("Error: ", err);
                    });
            })

        };
    }

    process_returnSongs() {
        let ret = this.DataHandler.data.tracks.hits;

        //If ret is from search query
        if (ret !== undefined) {
            return ret;
        }
        //Else this will return
        else return this.DataHandler.data.tracks;

        //Else this function will still return undefined nevertheless
    }

    process_musicHandler() {
        return {
            load: (src, spotify) => {
                this.MusicHandler.music = src;
                this.MusicHandler.spotify = spotify;
            },

            firstplay: () => {
                this.MusicHandler.engine = new Howl({
                    src: [this.MusicHandler.music],
                    volume: this.MusicHandler.volume,
                    onplay: () => {
                        this.MusicHandler.engine.fade(0, this.MusicHandler.volume, 1000);

                        //console.log(28500 - (this.MusicHandler.seek*1000) - 1500);

                        this.MusicHandler.timeout = setTimeout(() => {
                            this.MusicHandler.engine.fade(this.MusicHandler.volume, 0, 1000);
                        }, 28500 - (this.MusicHandler.seek * 1000) - 1500);
                    },
                });

                this.MusicHandler.engine.play();
            },

            unload: () => {
                if (this.MusicHandler.engine !== undefined) {
                    clearTimeout(this.MusicHandler.timeout);
                    this.MusicHandler.engine.unload();
                    this.MusicHandler.seek = 0;
                }
            },

            play: () => {
                if (!this.MusicHandler.engine.playing()) {
                    this.MusicHandler.engine.play();
                }
            },

            pause: () => {
                clearTimeout(this.MusicHandler.timeout);
                this.MusicHandler.engine.pause();
                this.MusicHandler.seek = this.MusicHandler.engine.seek();
            },

        };
    }

    template_SongData(title, artist, image, snippet, spotify, key) {
        return {
            title: title,
            artist: artist,
            image: image,
            snippet: snippet,
            spotify: spotify,
            key: key,
        };

    }

    spotify_redirect() {
        window.location.href = this.MusicHandler.spotify;
    }

}


class View {
    constructor() {
        this.DOMList = this.DOM();
    }

    DOM() {
        return {
            MainPanel: {
                Main: document.querySelector(".mother_container"),
                Cover: document.querySelector(".music_cover"),
                Grid: document.querySelector(".music_grid"),
                Player: document.querySelector(".music_player"),
                Background: document.querySelector(".background"),
            },

            MusicCover: {
                SearchBar: document.querySelector(".search_bar"),
                SearchButton: document.querySelector(".search_button"),
                Loading: document.querySelector(".loading_sprite"),
            },

            MusicPlayer: {
                Title: document.querySelector(".player_title"),
                Artist: document.querySelector(".player_artist"),
                Actions: document.querySelector(".action_tabs"),

            }
        };
    }

    process_OpenGrid() {
        this.DOMList.MainPanel.Grid.style.flex = 3;
        this.DOMList.MainPanel.Grid.style.padding = "2.5%";
        this.DOMList.MainPanel.Grid.style.marginBottom = "2.5%";
    }

    process_Player() {
        return {
            Open: (songdata) => {
                this.DOMList.MainPanel.Player.style.display = "block";
                let html = `
                    <h3 class="player_title">${songdata.title}</h3>
                    <p class="player_atist">${songdata.artist}</p>
                    
                    <div class="action_tabs">
                        <i class="ion-ios-play"></i>
                        <i class="ion-ios-pause"></i>
                        <i class="ion-radio-waves"></i>
                        <i class="ion-arrow-down-b"></i>
                    </div>
                `;

                this.DOMList.MainPanel.Player.innerHTML = html;


            },

            Close: () => {
                this.DOMList.MainPanel.Player.style.display = "none";
            }
        };
    }

    process_SongGrid() {
        return {
            Clear: () => {
                this.DOMList.MainPanel.Grid.innerHTML = "";
            },

            Add: (songData) => {
                let html = `
                <div class="music_box animate__animated animate__zoomIn" data-snippet="${songData.snippet}" data-spotify="${songData.spotify}" data-key="${songData.key}">

                    <div class="img_cont">
                        <img src="${(songData.image !== undefined ? songData.image : "./resources/img/album/01.jpg")}">
                    </div>

                    <div class="blur">
                        <div class="label">
                            <h3>${songData.title}</h3>
                            <p>${songData.artist}</p>
                        </div>
                        <i class="ion-play play_button"></i>
                        <i class="ion-shuffle suggest_button"></i>
                    </div>

                </div>`;

                this.DOMList.MainPanel.Grid.insertAdjacentHTML("beforeend", html);
            },

            Background: (url) => {
                this.DOMList.MainPanel.Background.style.backgroundImage = `url("${url}")`;
            }
        };
    }

    process_LoadingSprite() {
        return {
            Show: () => {
                this.DOMList.MusicCover.Loading.style.display = "block";
            },
            Hide: () => {
                this.DOMList.MusicCover.Loading.style.display = "none";
            }
        }
    }
}


class Controller {

    constructor(Model, View) {
        this.Model = Model;
        this.View = View;
        this.DOM = this.View.DOMList;
        this.Data = this.Model.DataHandler;
        this.initialize();

    }
    
    initialize() {

        this.DOM.MusicCover.SearchButton.addEventListener("click", async() => {

            this.View.process_LoadingSprite().Show();
            await this.Model.process_LoadSong(this.DOM.MusicCover.SearchBar.value).Search;
            //await this.Model.debug_LoadSong(this.DOM.MusicCover.SearchBar.value, 500);

            this.View.process_OpenGrid();

            this.View.process_SongGrid().Clear();




            this.process_LoadGrid(this.Model.process_returnSongs());

            await this.Model.process_LoadSong(this.DOM.MusicCover.SearchBar.value, 5).Search;



            this.process_LoadGrid(this.Model.process_returnSongs());

            await this.Model.process_LoadSong(this.DOM.MusicCover.SearchBar.value, 10).Search;

            this.process_LoadGrid(this.Model.process_returnSongs());

            await this.Model.process_LoadSong(this.DOM.MusicCover.SearchBar.value, 15).Search;


            this.View.process_LoadingSprite().Hide();

            this.process_LoadGrid(this.Model.process_returnSongs());


        });

        this.DOM.MainPanel.Grid.addEventListener("click", async (e) => {

            let dummy = e.target;
            let dummyParent = dummy.parentNode.parentNode;

            if (dummy.classList.contains("play_button")) {

                let musicEng = this.Model.process_musicHandler();

                musicEng.unload();

                musicEng.load(dummyParent.dataset.snippet, dummyParent.dataset.spotify);

                musicEng.firstplay();

                this.View.process_SongGrid().Background(dummyParent.querySelector("img").src);


                this.View.process_Player().Open({
                    title: dummy.parentNode.querySelector("h3").textContent,
                    artist: dummy.parentNode.querySelector("p").textContent
                });
            } else if (dummy.classList.contains("suggest_button")) {

                this.View.process_LoadingSprite().Show();
                //await this.Model.process_LoadSong(this.DOM.MusicCover.SearchBar.value).Search;
                await this.Model.process_LoadSong(dummyParent.dataset.key).Recommendations;

                this.View.process_OpenGrid();

                this.View.process_SongGrid().Clear();

                this.View.process_LoadingSprite().Hide();

                this.process_LoadGrid(this.Model.process_returnSongs());



                this.DOM.MainPanel.Grid.scrollTop = 0;

            }



        });

        this.DOM.MainPanel.Player.addEventListener("click", (e) => {

            let dummy = e.target.classList;
            let music_eng = this.Model.process_musicHandler();

            if (dummy.contains("ion-ios-play")) {
                music_eng.play();
            } else if (dummy.contains("ion-ios-pause")) {
                music_eng.pause();
            } else if (dummy.contains("ion-arrow-down-b")) {
                music_eng.unload();
                this.View.process_Player().Close();
            } else if (dummy.contains("ion-radio-waves")) {
                this.Model.spotify_redirect();
            }

        });

    }

    process_LoadGrid(SongArray) {

        let dummy, itemx, fixuri_spot, fixuri_m4a;
        let m4a_avail;



        for (let item = 0; item < SongArray.length; item++) {
            setTimeout(() => {

                itemx = SongArray[item];
                m4a_avail = true;

                if (itemx.track !== undefined) itemx = itemx.track;

                if (itemx.hub.actions == undefined) m4a_avail = false;
                if (m4a_avail) fixuri_m4a = itemx.hub.actions.length - 1;
                fixuri_spot = itemx.hub.providers[0].actions.length - 1;

                dummy = this.Model.template_SongData(
                    itemx.title,
                    itemx.subtitle,
                    itemx.images.coverart,
                    (m4a_avail ? itemx.hub.actions[fixuri_m4a].uri : undefined),
                    itemx.hub.providers[0].actions[fixuri_spot].uri,
                    itemx.key
                );

                this.View.process_SongGrid().Add(dummy);

            }, 500 + (100 * item))

        }



    }
}


new Controller(new Model(), new View());
