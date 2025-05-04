import { brands } from "./constants/brands.js";
import { swiperParams } from "./constants/swiperParams.js";
const contentBlock = document.querySelector('.content');
const switcherBtn = document.querySelector('.content__btn-switcher');
const textSwitcherBtn = switcherBtn.querySelector('span');
const slider = document.querySelector('.swiper-wrapper');

let isActiveBtn = false;
const brandsMediaBreakpoint = '(min-width: 768px)';
let brandsMediaQuery = window.matchMedia(brandsMediaBreakpoint);


const handleButtonToggle = () => {
    isActiveBtn = !isActiveBtn;
    switcherBtn.classList.toggle('active-btn');
    renderBrands();
}

switcherBtn.addEventListener('click', () => {
    handleButtonToggle();
});

const getVisibleLimit = () => window.innerWidth >= 768 ? 8 : 6;

const renderBrands = () => {
    contentBlock.innerHTML = '';
    let isVisibleBrands;

    if (isActiveBtn && brandsMediaQuery) {
        isVisibleBrands = brands;
    }
    else {
        isVisibleBrands = brands.slice(0, getVisibleLimit());
    }

    isVisibleBrands.map(el => {
        return contentBlock.innerHTML += `
        <li>
            <div class="content__element">
                <img src="${el.src}" alt="${el.alt}">
                <button class="content__element-btn">
                    <span></span>
                </button>
            </div>
        </li>
        `;
    });

    textSwitcherBtn.textContent = isActiveBtn ? 'Скрыть' : 'Показать все';
};

renderBrands(brandsMediaBreakpoint);

brandsMediaQuery.addEventListener('change', () => {
    renderBrands(brandsMediaBreakpoint);
});


const initialSwiper = (breakpoint, className, params) => {
    const swiperMediaQuery = window.matchMedia(breakpoint);
    let swiper = null;

    const enableSwiper = () => {
        if (!swiper) {
            swiper = new Swiper(className, params);
        }
    }

    const deleteSwiper = () => {
        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }
    };

    const updateSwiper = () => {
        if (swiperMediaQuery.matches) {
            enableSwiper();
        } else {
            deleteSwiper();
        }
    };

    swiperMediaQuery.addEventListener('change', () => {
        updateSwiper();
    })

    brands.map(el => {
        return slider.innerHTML += `
            <div class="swiper-slide">
                <div class="content__element">
                    <img src="${el.src}" alt="${el.alt}">
                    <button class="content__element-btn">
                        <span></span>
                    </button>
                </div>
            </div>`;
    });

    updateSwiper();
};


initialSwiper('(max-width: 550px)', '.brands-slider', swiperParams);






