<script setup lang="ts">
import * as m from '@/paraglide/messages'
import { type Locales } from '@/services/locale'
import { getRelativeLocaleUrl } from 'astro:i18n'
import PluginMarketing from './plugin_marketing.vue'

const props = defineProps<{ locale: Locales }>()
const randomOdd = Math.random() < 0.5 ? 0 : 1
</script>

<template>
  <div class="bg-white">
    <main
      class="flex items-center justify-center h-screen font-light leading-8 text-center bg-scroll bg-no-repeat bg-slate-900 text-slate-900 sm:flex-col sm:items-center md:pt-24"
      style="background-image: url('/5f9c104d097c52e7c1b98fe4_hero-code-consulting.webp'); background-position: 50% 100%; background-size: 520px"
    >
      <div
        class="static flex flex-col items-center justify-center mb-auto font-sans leading-8 max-w-none text-slate-900 sm:mt-auto sm:max-w-none sm:items-center sm:justify-center md:my-auto"
        style="padding: 10vh 5vw 5vh"
      >
        <div class="mx-auto my-0 text-center sm:mx-auto" style="max-width: 950px">
          <h1 class="relative pb-0 mt-0 mb-16 text-4xl font-medium text-white md:text-6xl" style="line-height: 72px">
            <strong style="line-height: 72px">CapacitorJS</strong>&nbsp;<span class="text-indigo-600" style="line-height: 72px"
              ><strong style="line-height: 72px">{{ m.code_review_and_consulting({}, { locale: props.locale }) }}</strong></span
            >&nbsp;<strong style="line-height: 72px">{{ m.services({}, { locale: props.locale }) }}</strong>
          </h1>
        </div>
        <div class="mx-auto mt-5 text-center sm:mx-auto" style="max-width: 754px">
          <h2 class="flex-col items-center justify-end block my-0 text-3xl font-medium text-gray-100 sm:text-center" style="line-height: 42px">
            &nbsp;{{ m.consult_your_capacitor_apps_and_review_the_code_with_us_to_deliver_bug_free_apps({}, { locale: props.locale }) }}
          </h2>
        </div>
        <a
          href="https://cal.com/martindonadieu/capacitor-code-review-and-consulting-services"
          target="_blank"
          class="mt-8 inline-block h-12 cursor-pointer rounded-none border-2 border-solid border-white bg-white bg-opacity-[0] bg-auto bg-no-repeat pb-2 pl-6 pr-12 pt-4 text-xs font-bold uppercase leading-3 text-white transition-none hover:border-indigo-300 hover:bg-indigo-300 sm:w-auto sm:max-w-none sm:flex-initial"
          style="
            transition: all 0.2s ease 0s;
            text-decoration: none;
            letter-spacing: 2px;
            background-image: url('/5f58c92280502cbbdcae3f56_arrow-right-button-bright.svg');
            background-position: 100% 50%;
          "
          ><strong class="uppercase" style="letter-spacing: 2px">{{ m.book_a_consultation({}, { locale: props.locale }) }}</strong></a
        >
      </div>
    </main>
    <section class="block pt-16 mt-0 font-light leading-8 text-center text-slate-900 sm:my-0 sm:pt-24">
      <div
        class="relative flex-col items-center block clear-both my-auto font-sans leading-8 max-w-none text-slate-900 sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="flex flex-col items-center mx-auto text-center sm:relative sm:mx-auto" style="max-width: 100vh">
          <p class="mt-0 mb-2 font-serif text-6xl font-normal text-slate-300 sm:text-6xl sm:font-normal sm:text-indigo-600" style="line-height: 96px">“</p>
          <div class="text-slate-900">
            <div role="list">
              <div role="listitem">
                <div class="table clear-both mb-10 text-lg italic font-normal" style="grid-area: 1 / 1 / 2 / 2">
                  <p class="mt-0 mb-2 italic">
                    <span v-html="m.testimonial_consulting({}, { locale: props.locale })" />
                  </p>
                </div>
                <img
                  loading="lazy"
                  width="80"
                  height="80"
                  src="/click_and_boat.webp"
                  alt="click an boat"
                  class="hidden max-w-full mb-4 align-middle border-0"
                  style="border-radius: 100%"
                />
                <div class="text-xl font-medium leading-6">TC Nicolas</div>
                <div>Click & Boat</div>
                <a
                  href="#"
                  class="inline-block max-w-full mt-3 font-normal text-indigo-600 bg-transparent cursor-pointer hover:text-black"
                  style="transition: all 0.2s ease 0s; text-decoration: none"
                  ><img loading="lazy" height="10" alt="logo" src="/click_and_boat.webp" class="inline-block w-1/2 max-w-full align-middle border-0"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="block pt-20 font-light leading-8 text-left text-slate-900">
      <div
        class="relative flex-col items-center block clear-both my-auto font-sans leading-8 text-center max-w-none sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="mx-auto mt-5 text-center sm:mx-auto" style="max-width: 754px">
          <h2 class="pb-10 my-0 font-sans text-6xl font-bold text-center text-slate-900">
            {{ m.code_review({}, { locale: props.locale }) }}<br class="text-6xl text-center" style="line-height: 72px" />&amp;
            <span class="text-6xl text-center text-indigo-600" style="text-decoration: none; line-height: 72px">{{ m.consulting({}, { locale: props.locale }) }}</span>
          </h2>
          <p class="mt-0 mb-24 text-slate-900">{{ m.when_its_good_to_ask_for_cordova_and_capacitorjs_consulting_services({}, { locale: props.locale }) }}:<br /><br /></p>
          <div class="mt-16 text-left md:grid" style="grid-auto-columns: 1fr; grid-template-columns: 0.25fr 1fr; grid-template-rows: auto auto auto auto auto; gap: 64px 30px">
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ m.case_1({}, { locale: props.locale }) }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="flex-col items-start justify-center block mt-0 mb-2 text-3xl font-bold sm:text-slate-900" style="line-height: 42px">
                {{ m.review_before_passing_the_code_to_the_production({}, { locale: props.locale }) }}
              </h5>
              <p class="mt-0 mb-2">
                {{ m.find_and_fix_bugs_during_the_coding_process({}, { locale: props.locale }) }}
                {{ m.it_s_faster_cheaper_and_requires_fewer_developers_to_do_it({}, { locale: props.locale }) }}<br /><br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ m.case_2({}, { locale: props.locale }) }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="flex-col items-start justify-center block mt-0 mb-2 text-3xl sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ m.optimization_of_the_existing_app({}, { locale: props.locale }) }}</strong>
              </h5>
              <p class="mt-0 mb-2">{{ m.when_down_review({}, { locale: props.locale }) }}<br /></p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ m.case_3({}, { locale: props.locale }) }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="flex-col items-start justify-center block mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ m.little_experience_with_capacitorjs({}, { locale: props.locale }) }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{ m.when_developing_a_capacitorjs_app_as_a_beginner_it_s_good_to_have_an_experienced_consultant_by_your_side({}, { locale: props.locale }) }}
                {{ m.let_them_review_your_work_and_give_your_team_an_opportunity_to_learn_from_the_experts({}, { locale: props.locale }) }}<br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ m.case_4({}, { locale: props.locale }) }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="flex-col items-start justify-center block mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ m.poor_app_quality({}, { locale: props.locale }) }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{ m.somebody_developed_an_app_for_you_but_it_doesn_t_meet_your_expectations_and_the_quality_of_the_final_product_is_really_low({}, { locale: props.locale })
                }}<br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ m.case_5({}, { locale: props.locale }) }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="flex-col items-start justify-center block mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ m.something_doesn_t_work_but_you_don_t_know_why({}, { locale: props.locale }) }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{ m.a_specific_element_of_your_app_doesn_t_work_and_you_don_t_know_where_the_problem_is_and_how_to_fix_it({}, { locale: props.locale }) }}<br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ m.case_6({}, { locale: props.locale }) }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="flex-col items-start justify-center block mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ m.plugin_is_missing({}, { locale: props.locale }) }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{ m.you_need_a_to_access_to_specific_native_api_and_the_right_plugin_don_t_exist_we_can_develop_it_for_you_or_support_you_with_it({}, { locale: props.locale })
                }}<br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ m.case_7({}, { locale: props.locale }) }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="flex-col items-start justify-center block mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ m.ci_cd_setup({}, { locale: props.locale }) }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{
                  m.our_team_helps_you_with_configuring_and_managing_automated_builds_tests_and_app_deployments_to_app_stores_through_fastlane_and_voltbuilder_in_your_cicd_environment(
                    {},
                    { locale: props.locale },
                  )
                }}<br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 font-light leading-8 text-center text-slate-900">
      <div
        class="relative flex-col items-center block clear-both my-auto font-sans leading-8 max-w-none text-slate-900 sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="mx-auto mt-5 text-center sm:mx-auto" style="max-width: 754px">
          <h2 class="py-10 mt-0 mb-5 text-6xl font-medium" style="line-height: 72px">
            <strong class="font-bold" style="line-height: 72px">{{ m.why_is_it_important({}, { locale: props.locale }) }}</strong>
          </h2>
        </div>
        <div class="mx-auto mt-5 text-center sm:mx-auto" style="max-width: 754px">
          <p class="mt-0 mb-24 text-slate-900">{{ m.code_consulting_and_review_is_more_than_just_a_bug_check_it_helps_to({}, { locale: props.locale }) }}<br /></p>
        </div>
        <div class="grid-flow-row md:grid md:text-left" style="gap: 64px 48px; grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: auto">
          <div class="text-slate-900">
            <div class="h-20 mb-6">
              <img
                src="/5fa52311f7e41c2d850aa66a_icon-code-consulting-01.svg"
                loading="lazy"
                height="80"
                alt="Icon consulting"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h5 class="flex-col items-start justify-center block mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
              <strong class="font-bold" style="line-height: 42px">{{ m.minimize_mistakes_and_their_impact_on_the_project({}, { locale: props.locale }) }}</strong>
            </h5>
          </div>
          <div class="text-slate-900">
            <div class="h-20 mb-6">
              <img
                src="/5fa523110b6488629923d270_icon-code-consulting-02.svg"
                loading="lazy"
                height="80"
                alt="icon consulting 2"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h5 class="flex-col items-start justify-center block mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
              <strong class="font-bold" style="line-height: 42px">{{ m.ensure_that_the_project_requirements_are_fulfilled({}, { locale: props.locale }) }}</strong>
            </h5>
          </div>
          <div class="text-slate-900">
            <div class="h-20 mb-6">
              <img
                src="/5fa5231016002724c966c3ce_icon-code-consulting-03.svg"
                loading="lazy"
                height="80"
                alt="icon consulting 3"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h5 class="flex-col items-start justify-center block mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
              <strong class="font-bold" style="line-height: 42px">{{ m.improve_overall_code_quality({}, { locale: props.locale }) }}</strong>
            </h5>
          </div>
          <div class="text-slate-900">
            <div class="h-20 mb-6">
              <img
                src="/5fa5231166c750849eb12738_icon-code-consulting-04.svg"
                loading="lazy"
                height="80"
                alt="icon consulting 4"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h5 class="flex-col items-start justify-center block mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
              <strong class="font-bold" style="line-height: 42px">{{ m.achieve_consistent_design_and_implementation({}, { locale: props.locale }) }}</strong>
            </h5>
          </div>
        </div>
      </div>
    </section>
    <section class="block py-0 font-light leading-8 text-center text-white bg-indigo-600 sm:pt-32">
      <div
        class="relative flex-col items-center block clear-both my-auto font-sans leading-8 text-white max-w-none sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="mx-auto my-0 text-center sm:mx-auto" style="max-width: 950px">
          <h2 class="relative pb-10 mt-0 mb-24 text-6xl font-medium" style="line-height: 72px">{{ m.technological_benefits({}, { locale: props.locale }) }}</h2>
        </div>
        <div class="gap-8 md:grid md:text-left" style="grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto auto; align-content: stretch">
          <div
            class="text-white opacity-100"
            style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; opacity: 1"
          >
            <div class="h-12 mb-6">
              <img
                src="/5faa754a59f4a273466af44c_icon-cc-special-01.svg"
                loading="lazy"
                height="50"
                alt="icon consulting special"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h4 class="my-2 text-xl font-medium leading-6 filter-none">
              <strong class="font-bold">{{ m.better_code_quality({}, { locale: props.locale }) }}</strong>
            </h4>
            <p class="block mt-auto mb-2 text-lg whitespace-normal">
              {{ m.let_more_experienced_people_review_your_work_and_give_your_team_an_opportunity_to_learn_from_the_experts({}, { locale: props.locale }) }}
            </p>
          </div>
          <div
            class="text-white opacity-100"
            style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; opacity: 1"
          >
            <div class="h-12 mb-6">
              <img
                src="/5faa754aded9d51509ed1e5e_icon-cc-special-02.svg"
                loading="lazy"
                height="50"
                alt="icon consulting special 2"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h4 class="my-2 text-xl font-medium leading-6 filter-none">
              <strong class="font-bold">{{ m.improved_code_readability({}, { locale: props.locale }) }}</strong
              ><br />
            </h4>
            <p class="block mt-auto mb-2 text-lg whitespace-normal">
              {{
                m.it_s_possible_that_different_developers_will_read_your_code_in_the_future_reduce_unnecessary_pieces_of_it_to_make_it_shorter_and_more_expressive(
                  {},
                  { locale: props.locale },
                )
              }}
            </p>
          </div>
          <div
            class="text-white opacity-100"
            style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; opacity: 1"
          >
            <div class="h-12 mb-6">
              <img
                src="/5faa754a1644d1e0529a915c_icon-cc-special-03.svg"
                loading="lazy"
                height="50"
                alt="icon consulting special 3"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h4 class="my-2 text-xl font-medium leading-6 filter-none">
              <strong class="font-bold">{{ m.bugs_reduction({}, { locale: props.locale }) }}</strong>
            </h4>
            <p class="block mt-auto mb-2 text-lg whitespace-normal">
              {{ m.eliminate_the_number_of_bugs_before_passing_the_code_to_production({}, { locale: props.locale }) }}<strong class="font-bold" />
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="block font-light leading-8 text-left bg-slate-900 text-slate-900" style="padding-top: 5vh; padding-bottom: 5vh">
      <div
        class="relative flex-col items-center block clear-both my-auto font-sans leading-8 text-center max-w-none sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="flex flex-col items-center justify-center text-center" style="padding-right: 3vw; padding-left: 3vw">
          <h2
            v-html="m.hire_capacitorjs_consultants({}, { locale: props.locale }).replace('CapacitorJS', `<span class='text-indigo-600'>CapacitorJS</span>`)"
            class="relative pb-10 my-0 text-6xl font-medium text-white"
            style="line-height: 72px"
          />
          <a
            href="https://cal.com/martindonadieu/capacitor-code-review-and-consulting-services"
            target="_blank"
            class="mt-8 inline-block h-12 cursor-pointer rounded-none border-2 border-solid border-white bg-white bg-opacity-[0] bg-auto bg-no-repeat pb-2 pl-6 pr-12 pt-4 text-xs font-bold uppercase leading-3 text-white transition-none hover:border-indigo-300 hover:bg-indigo-300 sm:w-auto sm:max-w-none sm:flex-initial"
            style="
              transition: all 0.2s ease 0s;
              text-decoration: none;
              letter-spacing: 2px;
              background-image: url('/5f58c92280502cbbdcae3f56_arrow-right-button-bright.svg');
              background-position: 100% 50%;
            "
            ><strong class="uppercase" style="letter-spacing: 2px">{{ m.book_a_consultation({}, { locale: props.locale }) }}</strong></a
          >
        </div>
      </div>
    </section>
    <div
      class="relative flex-col items-center block clear-both my-auto font-sans font-light leading-8 text-center max-w-none text-slate-900 sm:max-w-none"
      style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
    >
      <div class="mx-auto mt-5 leading-8 text-slate-900 sm:mx-auto" style="max-width: 754px">
        <h2 class="py-10 mt-0 mb-5 text-6xl font-medium" style="line-height: 72px">{{ m.business_benefits({}, { locale: props.locale }) }}</h2>
      </div>
      <div class="items-stretch gap-4 leading-8 text-slate-900 sm:text-left md:grid" style="grid-template-columns: 0.5fr 0.5fr; grid-template-rows: auto; column-gap: 64px">
        <div>
          <div class="h-20 mb-6 text-slate-900">
            <img
              src="/5fa3f3228235fd74f2756006_icon-code-consulting-05.svg"
              loading="lazy"
              height="80"
              alt="icon consulting 5"
              class="inline-block max-w-full align-middle border-0"
            />
          </div>
          <h5 class="flex-col items-start justify-center block mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
            <strong class="font-bold" style="line-height: 42px">{{ m.lower_cost_of_fixing_bugs({}, { locale: props.locale }) }}</strong>
          </h5>
          <p class="mt-0 mb-2 text-slate-900">
            {{
              m.the_faster_you_find_the_bug_the_cheaper_you_can_fix_it_if_the_bug_is_spotted_during_the_development_process_it_s_easier_and_cheaper_to_remove_it(
                {},
                { locale: props.locale },
              )
            }}
          </p>
        </div>
        <div>
          <div class="h-20 mb-6 text-slate-900">
            <img
              src="/5fa3f32276aae4494f1e1e73_icon-code-consulting-06.svg"
              loading="lazy"
              height="80"
              alt="icon consulting 6"
              class="inline-block max-w-full align-middle border-0"
            />
          </div>
          <h5 class="flex-col items-start justify-center block mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
            <strong class="font-bold" style="line-height: 42px"
              >{{ m.opportunity_for_juniors_to_develop_skills({}, { locale: props.locale }) }}<br style="line-height: 42px"
            /></strong>
          </h5>
          <p class="mt-0 mb-2 text-slate-900">
            {{ m.help_your_junior_developers_extend_their_knowledge_by_giving_them_the_opportunity_to_cooperate_with_more_experienced_developers({}, { locale: props.locale })
            }}<br />
          </p>
        </div>
      </div>
    </div>
    <div class="relative flex-col items-center block my-auto font-sans font-light leading-8 text-center bg-dark max-w-none text-slate-900 sm:max-w-none" style="padding: 10vh 5vw">
      <div class="mx-auto leading-8 text-slate-900" style="max-width: 70%">
        <h2 class="w-full pb-10 my-0 text-6xl font-medium text-white" style="line-height: 72px">
          {{ m.why_work({}, { locale: props.locale }) }}
          <span class="text-center text-indigo-600" style="line-height: 72px">{{ m.with_us({}, { locale: props.locale }) }}</span>
        </h2>
      </div>
      <div class="grid-flow-row gap-6 leading-8 md:grid md:text-left" style="grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto auto; padding-top: 5vh">
        <div class="flex flex-col items-center justify-center px-5 text-left">
          <img src="/628664bc9a5b8b85917e5c1f_community.svg" loading="lazy" width="151" alt="Community icon" class="inline-block max-w-full mt-0 mb-auto align-middle border-0" />
          <p class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal">
            {{ m.community_trusted({}, { locale: props.locale }) }}
            <a
              href="https://x.com/martindonadieu"
              target="_blank"
              title=" Capgo team"
              class="font-normal text-indigo-600 cursor-pointer hover:font-normal hover:text-indigo-600"
              style="
                transition:
                  color 450ms ease 0s,
                  all 0.3s ease 0s;
                text-decoration: underline;
              "
            >
              Cordova &amp; CapacitorJS expert</a
            >
          </p>
        </div>
        <div class="flex flex-col items-center justify-center px-5 text-left">
          <img
            src="/628665001abcfb45461302f2_our%20work.svg"
            loading="lazy"
            width="151"
            alt="RN projects icon"
            class="inline-block max-w-full mt-0 mb-auto align-middle border-0"
          />
          <p class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal">
            {{ m.experienced_in_working_on_demanding({}, { locale: props.locale }) }}
            <a
              href="https://github.com/Cap-go/capacitor-updater"
              target="_blank"
              title="Cordova &amp; CapacitorJS projects"
              class="font-normal text-indigo-600 cursor-pointer hover:font-normal hover:text-indigo-600"
              style="
                transition:
                  color 450ms ease 0s,
                  all 0.3s ease 0s;
                text-decoration: underline;
              "
              >{{ m.cordova_capacitorjs_projects({}, { locale: props.locale }) }}</a
            >
          </p>
        </div>
        <div v-if="randomOdd" class="flex flex-col items-center justify-center px-5 text-left">
          <img
            src="/628665198526443cedf94743_open%20source.svg"
            loading="lazy"
            width="151"
            alt="Open source icon"
            class="inline-block max-w-full mt-0 mb-auto align-middle border-0"
          />
          <p class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal">
            Creators and maintainers of many
            <a
              title="Open source"
              class="font-normal text-indigo-600 cursor-pointer hover:font-normal hover:text-indigo-600"
              :href="getRelativeLocaleUrl(props.locale, 'plugins')"
              style="
                transition:
                  color 450ms ease 0s,
                  all 0.3s ease 0s;
                text-decoration: underline;
              "
              >Open Source libraries</a
            >
            used by millions
          </p>
        </div>
        <div v-else class="flex flex-col items-center justify-center px-5 text-left">
          <img
            src="/6286658deaf6961fb2d6d4c0_core%20contrubutor.svg"
            loading="lazy"
            width="151"
            alt="Core contributors icon"
            class="inline-block max-w-full mt-0 mb-auto align-middle border-0"
          />
          <p
            v-html="
              m.core_contributors_to_capacitorjs_and_ionic({}, { locale: props.locale }).replace(
                'CapacitorJS',
                `<a
              href='https://capacitorjs.com/'
              title='Core contributors'
              class='font-normal text-indigo-600 cursor-pointer hover:font-normal hover:text-indigo-600'
              style='
                transition:
                  color 450ms ease 0s,
                  all 0.3s ease 0s;
                text-decoration: underline;
              '
              >CapacitorJS</a
            >`,
              )
            "
            class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal"
          />
        </div>
      </div>
    </div>
    <PluginMarketing :locale="props.locale" />
    <div
      class="relative flex-col items-center block clear-both my-auto font-sans font-light leading-8 text-center max-w-none text-slate-900 sm:max-w-none"
      style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
    >
      <div class="leading-8 text-slate-900">
        <div role="list" class="text-center">
          <div role="listitem" class="text-slate-900">
            <div class="flex flex-col items-center mx-auto sm:relative sm:mx-auto" style="max-width: 100vh">
              <p class="mt-0 mb-2 font-serif text-6xl font-normal text-slate-300 sm:text-6xl sm:font-normal sm:text-indigo-600" style="line-height: 96px">“</p>
              <div class="table clear-both mb-10 text-lg italic font-normal" style="grid-area: 1 / 1 / 2 / 2">
                <p class="mt-0 mb-2 italic">
                  <span v-html="m.testimonial_consulting_2({}, { locale: props.locale })" />
                </p>
              </div>
              <img loading="lazy" height="80" src="/waynium.webp" alt="wainium logo" class="hidden max-w-full mb-4 align-middle border-0" style="border-radius: 100%" />
              <div class="text-xl font-medium leading-6">Iannis</div>
              <div>CTO &amp; Co-founder @ WAYNIUM</div>
              <a
                href="#"
                class="inline-block max-w-full font-normal text-indigo-600 bg-transparent cursor-pointer hover:text-black"
                style="transition: all 0.2s ease 0s; text-decoration: none"
                ><img width="39" loading="lazy" alt="logo waynium" src="/waynium.webp" class="inline-block max-w-full mt-3 align-middle border-0"
              /></a>
            </div>
          </div>
        </div>
        <div role="navigation" aria-label="List" class="flex flex-wrap justify-center text-center" />
      </div>
    </div>
    <section
      id="contact-hireus"
      class="relative flex-col items-center block my-auto font-sans font-light leading-8 text-center max-w-none bg-slate-900 text-slate-900 sm:max-w-none"
      style="padding: 10vh 5vw"
    >
      <div class="flex flex-col w-full md:flex-row">
        <div class="flex flex-col w-1/3 font-sans font-light leading-8 text-left text-slate-900">
          <h2
            class="items-start justify-center block pt-0 pb-10 pl-16 mt-5 mb-0 text-xs font-bold leading-4 text-black uppercase bg-no-repeat bg-auto"
            style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; filter: invert(100%); letter-spacing: 1.7px; min-width: 3px"
          >
            <strong class="text-left uppercase" style="letter-spacing: 1.7px">{{ m.contact({}, { locale: props.locale }) }}</strong
            ><br class="text-left uppercase" style="letter-spacing: 1.7px" />
          </h2>
        </div>
        <div class="flex flex-col">
          <h3 class="w-full pt-2 pb-10 my-0 mr-10 font-sans text-6xl font-medium text-left text-white" style="line-height: 72px">
            {{ m.lets_work_together({}, { locale: props.locale }) }}
          </h3>
          <p class="block mt-auto mb-2 font-sans text-lg font-light leading-8 text-left text-white whitespace-normal bg-transparent">
            {{ m.need_help_with_cordova_or_capacitorjs_let_us_know({}, { locale: props.locale }) }}
          </p>
          <a
            href="https://cal.com/martindonadieu/capacitor-code-review-and-consulting-services"
            target="_blank"
            class="mt-8 inline-block h-12 cursor-pointer rounded-none border-2 border-solid border-white bg-white bg-opacity-[0] bg-auto bg-no-repeat pb-2 pl-6 pr-12 pt-4 text-xs font-bold uppercase leading-3 text-white transition-none hover:border-indigo-300 hover:bg-indigo-300 sm:w-auto sm:max-w-none sm:flex-initial"
            style="
              transition: all 0.2s ease 0s;
              text-decoration: none;
              letter-spacing: 2px;
              background-image: url('/5f58c92280502cbbdcae3f56_arrow-right-button-bright.svg');
              background-position: 100% 50%;
            "
            ><strong class="uppercase" style="letter-spacing: 2px">{{ m.book_a_consultation({}, { locale: props.locale }) }}</strong></a
          >
        </div>
      </div>
    </section>
  </div>
</template>
