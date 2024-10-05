<script setup lang="ts">
import plugin_marketing from './plugin_marketing.vue'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()
const randomOdd = Math.random() < 0.5 ? 0 : 1
</script>

<template>
  <div class="bg-white">
    <main
      class="flex justify-center items-center md:pt-24 h-screen font-light leading-8 text-center bg-scroll bg-no-repeat bg-slate-900 text-slate-900 sm:flex-col sm:items-center"
      style="background-image: url('/5f9c104d097c52e7c1b98fe4_hero-code-consulting.webp'); background-position: 50% 100%; background-size: 520px"
    >
      <div
        class="flex static flex-col justify-center items-center mb-auto md:my-auto max-w-none font-sans leading-8 text-slate-900 sm:mt-auto sm:max-w-none sm:items-center sm:justify-center"
        style="padding: 10vh 5vw 5vh"
      >
        <div class="my-0 mx-auto text-center sm:mx-auto" style="max-width: 950px">
          <h1 class="relative pb-0 mt-0 mb-16 text-4xl md:text-6xl font-medium text-white" style="line-height: 72px">
            <strong style="line-height: 72px">CapacitorJS</strong
            ><span class="text-indigo-600" style="line-height: 72px"
              ><strong style="line-height: 72px">{{ translations['code_review_and_consulting'][props.locale] }}</strong></span
            ><strong style="line-height: 72px">{{ translations['services'][props.locale] }}</strong>
          </h1>
        </div>
        <div class="mx-auto mt-5 text-center sm:mx-auto" style="max-width: 754px">
          <h2 class="block flex-col justify-end text-gray-100 items-center my-0 text-3xl font-medium sm:text-center" style="line-height: 42px">
            &nbsp;{{ translations['consult_your_capacitor_apps_and_review_the_code_with_us_to_deliver_bug_free_apps'][props.locale] }}
          </h2>
        </div>
        <a
          href="https://cal.com/martindonadieu/capacitor-code-review-and-consulting-services"
          target="_blank"
          class="inline-block pt-4 pr-12 pb-2 pl-6 mt-8 h-12 text-xs font-bold leading-3 text-white uppercase bg-white bg-no-repeat bg-auto rounded-none border-2 border-white border-solid transition-none cursor-pointer bg-opacity-[0] hover:border-indigo-300 hover:bg-indigo-300 hover:bg-indigo-300 sm:w-auto sm:max-w-none sm:flex-initial"
          style="
            transition: all 0.2s ease 0s;
            text-decoration: none;
            letter-spacing: 2px;
            background-image: url('/5f58c92280502cbbdcae3f56_arrow-right-button-bright.svg');
            background-position: 100% 50%;
          "
          ><strong class="uppercase" style="letter-spacing: 2px">{{ translations['book_a_consultation'][props.locale] }}</strong></a
        >
      </div>
    </main>
    <section class="block pt-16 mt-0 font-light leading-8 text-center text-slate-900 sm:my-0 sm:pt-24">
      <div
        class="block clear-both relative flex-col items-center my-auto max-w-none font-sans leading-8 text-slate-900 sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="flex flex-col items-center mx-auto text-center sm:relative sm:mx-auto" style="max-width: 100vh">
          <p class="mt-0 mb-2 font-serif text-6xl font-normal text-slate-300 sm:text-6xl sm:font-normal sm:text-indigo-600" style="line-height: 96px">“</p>
          <div class="text-slate-900">
            <div role="list">
              <div role="listitem">
                <div class="table clear-both mb-10 text-lg italic font-normal" style="grid-area: 1 / 1 / 2 / 2">
                  <p class="mt-0 mb-2 italic">
                    {{ translations['capgo_not_only_has_incredibly_talented_engineers_but_they_also_share_my_passion_for_project_success'][props.locale] }} Having a
                    <strong class="italic font-bold">true partner</strong> has been a wonderful experience, and it allows us to move much faster than we could alone.
                  </p>
                </div>
                <img
                  loading="lazy"
                  width="80"
                  height="80"
                  src="/click_and_boat.webp"
                  alt="click an boat"
                  class="hidden mb-4 max-w-full align-middle border-0"
                  style="border-radius: 100%"
                />
                <div class="text-xl font-medium leading-6">TC Nicolas</div>
                <div>Click & Boat</div>
                <a
                  href="#"
                  class="inline-block mt-3 max-w-full font-normal text-indigo-600 bg-transparent cursor-pointer hover:text-black"
                  style="transition: all 0.2s ease 0s; text-decoration: none"
                  ><img loading="lazy" height="10" alt="logo" src="/click_and_boat.webp" class="inline-block max-w-full align-middle border-0 w-1/2"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="block pt-20 font-light leading-8 text-left text-slate-900">
      <div
        class="block clear-both relative flex-col items-center my-auto max-w-none font-sans leading-8 text-center sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="mx-auto mt-5 text-center sm:mx-auto" style="max-width: 754px">
          <h2 class="pb-10 my-0 font-sans text-6xl font-bold text-center text-slate-900">
            Code review<br class="text-6xl text-center" style="line-height: 72px" />&amp;
            <span class="text-6xl text-center text-indigo-600" style="text-decoration: none; line-height: 72px">{{ translations['consulting'][props.locale] }}</span>
          </h2>
          <p class="mt-0 mb-24 text-slate-900">{{ translations['when_its_good_to_ask_for_cordova_and_capacitorjs_consulting_services'][props.locale] }}:<br /><br /></p>
          <div class="md:grid mt-16 text-left" style="grid-auto-columns: 1fr; grid-template-columns: 0.25fr 1fr; grid-template-rows: auto auto auto auto auto; gap: 64px 30px">
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ translations['case_1'][props.locale] }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="block flex-col font-bold justify-center items-start mt-0 mb-2 text-3xl sm:text-slate-900" style="line-height: 42px">
                {{ translations['review_before_passing_the_code_to_the_production'][props.locale] }}
              </h5>
              <p class="mt-0 mb-2">
                {{ translations['find_and_fix_bugs_during_the_coding_process'][props.locale] }}
                {{ translations['it_s_faster_cheaper_and_requires_fewer_developers_to_do_it'][props.locale] }}<br /><br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ translations['case_2'][props.locale] }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="block flex-col justify-center items-start mt-0 mb-2 text-3xl sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ translations['optimization_of_the_existing_app'][props.locale] }}</strong>
              </h5>
              <p class="mt-0 mb-2">{{ translations['when_down_review'][props.locale] }}<br /></p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ translations['case_3'][props.locale] }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="block flex-col justify-center items-start mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ translations['little_experience_with_capacitorjs'][props.locale] }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{ translations['when_developing_a_capacitorjs_app_as_a_beginner_it_s_good_to_have_an_experienced_consultant_by_your_side'][props.locale] }}
                {{ translations['let_them_review_your_work_and_give_your_team_an_opportunity_to_learn_from_the_experts'][props.locale] }}<br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ translations['case_4'][props.locale] }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="block flex-col justify-center items-start mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ translations['poor_app_quality'][props.locale] }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{ translations['somebody_developed_an_app_for_you_but_it_doesn_t_meet_your_expectations_and_the_quality_of_the_final_product_is_really_low'][props.locale] }}<br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ translations['case_5'][props.locale] }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="block flex-col justify-center items-start mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ translations['something_doesn_t_work_but_you_don_t_know_why'][props.locale] }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{ translations['a_specific_element_of_your_app_doesn_t_work_and_you_don_t_know_where_the_problem_is_and_how_to_fix_it'][props.locale] }}<br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ translations['case_6'][props.locale] }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="block flex-col justify-center items-start mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ translations['plugin_is_missing'][props.locale] }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{ translations['you_need_a_to_access_to_specific_native_api_and_the_right_plugin_don_t_exist_we_can_develop_it_for_you_or_support_you_with_it'][props.locale]
                }}<br />
              </p>
            </div>
            <div class="text-slate-900">
              <h6
                class="pl-16 my-2 text-xs font-bold leading-3 text-black uppercase bg-no-repeat bg-auto"
                style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; letter-spacing: 1.7px"
              >
                {{ translations['case_7'][props.locale] }}
              </h6>
            </div>
            <div class="text-slate-900">
              <h5 class="block flex-col justify-center items-start mt-0 mb-2 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
                <strong class="font-bold" style="line-height: 42px">{{ translations['ci_cd_setup'][props.locale] }}</strong>
              </h5>
              <p class="mt-0 mb-2">
                {{
                  translations[
                    'our_team_helps_you_with_configuring_and_managing_automated_builds_tests_and_app_deployments_to_app_stores_through_fastlane_and_voltbuilder_in_your_cicd_environment'
                  ][props.locale]
                }}<br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 font-light leading-8 text-center text-slate-900">
      <div
        class="block clear-both relative flex-col items-center my-auto max-w-none font-sans leading-8 text-slate-900 sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="mx-auto mt-5 text-center sm:mx-auto" style="max-width: 754px">
          <h2 class="py-10 mt-0 mb-5 text-6xl font-medium" style="line-height: 72px">
            <strong class="font-bold" style="line-height: 72px">{{ translations['why_is_it_important'][props.locale] }}</strong>
          </h2>
        </div>
        <div class="mx-auto mt-5 text-center sm:mx-auto" style="max-width: 754px">
          <p class="mt-0 mb-24 text-slate-900">{{ translations['code_consulting_and_review_is_more_than_just_a_bug_check_it_helps_to'][props.locale] }}<br /></p>
        </div>
        <div class="md:grid grid-flow-row md:text-left" style="gap: 64px 48px; grid-template-columns: 1fr 1fr 1fr 1fr; grid-template-rows: auto">
          <div class="text-slate-900">
            <div class="mb-6 h-20">
              <img
                src="/5fa52311f7e41c2d850aa66a_icon-code-consulting-01.svg"
                loading="lazy"
                height="80"
                alt="Icon consulting"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h5 class="block flex-col justify-center items-start mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
              <strong class="font-bold" style="line-height: 42px">{{ translations['minimize_mistakes_and_their_impact_on_the_project'][props.locale] }}</strong>
            </h5>
          </div>
          <div class="text-slate-900">
            <div class="mb-6 h-20">
              <img
                src="/5fa523110b6488629923d270_icon-code-consulting-02.svg"
                loading="lazy"
                height="80"
                alt="icon consulting 2"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h5 class="block flex-col justify-center items-start mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
              <strong class="font-bold" style="line-height: 42px">{{ translations['ensure_that_the_project_requirements_are_fulfilled'][props.locale] }}</strong>
            </h5>
          </div>
          <div class="text-slate-900">
            <div class="mb-6 h-20">
              <img
                src="/5fa5231016002724c966c3ce_icon-code-consulting-03.svg"
                loading="lazy"
                height="80"
                alt="icon consulting 3"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h5 class="block flex-col justify-center items-start mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
              <strong class="font-bold" style="line-height: 42px">{{ translations['improve_overall_code_quality'][props.locale] }}</strong>
            </h5>
          </div>
          <div class="text-slate-900">
            <div class="mb-6 h-20">
              <img
                src="/5fa5231166c750849eb12738_icon-code-consulting-04.svg"
                loading="lazy"
                height="80"
                alt="icon consulting 4"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h5 class="block flex-col justify-center items-start mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
              <strong class="font-bold" style="line-height: 42px">{{ translations['achieve_consistent_design_and_implementation'][props.locale] }}</strong>
            </h5>
          </div>
        </div>
      </div>
    </section>
    <section class="block py-0 font-light leading-8 text-center text-white bg-indigo-600 sm:pt-32">
      <div
        class="block clear-both relative flex-col items-center my-auto max-w-none font-sans leading-8 text-white sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="my-0 mx-auto text-center sm:mx-auto" style="max-width: 950px">
          <h2 class="relative pb-10 mt-0 mb-24 text-6xl font-medium" style="line-height: 72px">{{ translations['technological_benefits'][props.locale] }}</h2>
        </div>
        <div class="md:grid gap-8 md:text-left" style="grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto auto; align-content: stretch">
          <div
            class="text-white opacity-100"
            style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; opacity: 1"
          >
            <div class="mb-6 h-12">
              <img
                src="/5faa754a59f4a273466af44c_icon-cc-special-01.svg"
                loading="lazy"
                height="50"
                alt="icon consulting special"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h4 class="my-2 text-xl font-medium leading-6 filter-none">
              <strong class="font-bold">{{ translations['better_code_quality'][props.locale] }}</strong>
            </h4>
            <p class="block mt-auto mb-2 text-lg whitespace-normal">
              {{ translations['let_more_experienced_people_review_your_work_and_give_your_team_an_opportunity_to_learn_from_the_experts'][props.locale] }}
            </p>
          </div>
          <div
            class="text-white opacity-100"
            style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; opacity: 1"
          >
            <div class="mb-6 h-12">
              <img
                src="/5faa754aded9d51509ed1e5e_icon-cc-special-02.svg"
                loading="lazy"
                height="50"
                alt="icon consulting special 2"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h4 class="my-2 text-xl font-medium leading-6 filter-none">
              <strong class="font-bold">{{ translations['improved_code_readability'][props.locale] }}</strong
              ><br />
            </h4>
            <p class="block mt-auto mb-2 text-lg whitespace-normal">
              {{
                translations['it_s_possible_that_different_developers_will_read_your_code_in_the_future_reduce_unnecessary_pieces_of_it_to_make_it_shorter_and_more_expressive'][
                  props.locale
                ]
              }}
            </p>
          </div>
          <div
            class="text-white opacity-100"
            style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; opacity: 1"
          >
            <div class="mb-6 h-12">
              <img
                src="/5faa754a1644d1e0529a915c_icon-cc-special-03.svg"
                loading="lazy"
                height="50"
                alt="icon consulting special 3"
                class="inline-block max-w-full align-middle border-0"
              />
            </div>
            <h4 class="my-2 text-xl font-medium leading-6 filter-none">
              <strong class="font-bold">{{ translations['bugs_reduction'][props.locale] }}</strong>
            </h4>
            <p class="block mt-auto mb-2 text-lg whitespace-normal">
              {{ translations['eliminate_the_number_of_bugs_before_passing_the_code_to_production'][props.locale] }}<strong class="font-bold" />
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="block font-light leading-8 text-left bg-slate-900 text-slate-900" style="padding-top: 5vh; padding-bottom: 5vh">
      <div
        class="block clear-both relative flex-col items-center my-auto max-w-none font-sans leading-8 text-center sm:max-w-none"
        style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
      >
        <div class="flex flex-col justify-center items-center text-center" style="padding-right: 3vw; padding-left: 3vw">
          <h2 class="relative pb-10 my-0 text-6xl font-medium text-white" style="line-height: 72px">
            Hire
            <span class="text-indigo-600" style="line-height: 72px">CapacitorJS</span>
            Consultants
          </h2>
          <a
            href="https://cal.com/martindonadieu/capacitor-code-review-and-consulting-services"
            target="_blank"
            class="inline-block pt-4 pr-12 pb-2 pl-6 mt-8 h-12 text-xs font-bold leading-3 text-white uppercase bg-white bg-no-repeat bg-auto rounded-none border-2 border-white border-solid transition-none cursor-pointer bg-opacity-[0] hover:border-indigo-300 hover:bg-indigo-300 hover:bg-indigo-300 sm:w-auto sm:max-w-none sm:flex-initial"
            style="
              transition: all 0.2s ease 0s;
              text-decoration: none;
              letter-spacing: 2px;
              background-image: url('/5f58c92280502cbbdcae3f56_arrow-right-button-bright.svg');
              background-position: 100% 50%;
            "
            ><strong class="uppercase" style="letter-spacing: 2px">{{ translations['book_a_consultation'][props.locale] }}</strong></a
          >
        </div>
      </div>
    </section>
    <div
      class="block clear-both relative flex-col items-center my-auto max-w-none font-sans font-light leading-8 text-center text-slate-900 sm:max-w-none"
      style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
    >
      <div class="mx-auto mt-5 leading-8 text-slate-900 sm:mx-auto" style="max-width: 754px">
        <h2 class="py-10 mt-0 mb-5 text-6xl font-medium" style="line-height: 72px">{{ translations['business_benefits'][props.locale] }}</h2>
      </div>
      <div class="md:grid gap-4 items-stretch leading-8 text-slate-900 sm:text-left" style="grid-template-columns: 0.5fr 0.5fr; grid-template-rows: auto; column-gap: 64px">
        <div>
          <div class="mb-6 h-20 text-slate-900">
            <img
              src="/5fa3f3228235fd74f2756006_icon-code-consulting-05.svg"
              loading="lazy"
              height="80"
              alt="icon consulting 5"
              class="inline-block max-w-full align-middle border-0"
            />
          </div>
          <h5 class="block flex-col justify-center items-start mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
            <strong class="font-bold" style="line-height: 42px">{{ translations['lower_cost_of_fixing_bugs'][props.locale] }}</strong>
          </h5>
          <p class="mt-0 mb-2 text-slate-900">
            {{
              translations['the_faster_you_find_the_bug_the_cheaper_you_can_fix_it_if_the_bug_is_spotted_during_the_development_process_it_s_easier_and_cheaper_to_remove_it'][
                props.locale
              ]
            }}
          </p>
        </div>
        <div>
          <div class="mb-6 h-20 text-slate-900">
            <img
              src="/5fa3f32276aae4494f1e1e73_icon-code-consulting-06.svg"
              loading="lazy"
              height="80"
              alt="icon consulting 6"
              class="inline-block max-w-full align-middle border-0"
            />
          </div>
          <h5 class="block flex-col justify-center items-start mt-0 mb-6 text-3xl font-medium sm:text-slate-900" style="line-height: 42px">
            <strong class="font-bold" style="line-height: 42px"
              >{{ translations['opportunity_for_juniors_to_develop_skills'][props.locale] }}<br style="line-height: 42px"
            /></strong>
          </h5>
          <p class="mt-0 mb-2 text-slate-900">
            {{ translations['help_your_junior_developers_extend_their_knowledge_by_giving_them_the_opportunity_to_cooperate_with_more_experienced_developers'][props.locale]
            }}<br />
          </p>
        </div>
      </div>
    </div>
    <div class="block relative bg-dark flex-col items-center my-auto max-w-none font-sans font-light leading-8 text-center text-slate-900 sm:max-w-none" style="padding: 10vh 5vw">
      <div class="mx-auto leading-8 text-slate-900" style="max-width: 70%">
        <h2 class="pb-10 my-0 w-full text-6xl font-medium text-white" style="line-height: 72px">
          Why work
          <span class="text-center text-indigo-600" style="line-height: 72px">with us?</span>
        </h2>
      </div>
      <div class="md:grid grid-flow-row gap-6 leading-8 md:text-left" style="grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto auto; padding-top: 5vh">
        <div class="flex flex-col justify-center items-center px-5 text-left">
          <img src="/628664bc9a5b8b85917e5c1f_community.svg" loading="lazy" width="151" alt="Community icon" class="inline-block mt-0 mb-auto max-w-full align-middle border-0" />
          <p class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal">
            {{ translations['community_trusted'][props.locale] }}
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
        <div class="flex flex-col justify-center items-center px-5 text-left">
          <img
            src="/628665001abcfb45461302f2_our%20work.svg"
            loading="lazy"
            width="151"
            alt="RN projects icon"
            class="inline-block mt-0 mb-auto max-w-full align-middle border-0"
          />
          <p class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal">
            Experienced in working on demanding
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
              >Cordova &amp; CapacitorJS projects</a
            >
          </p>
        </div>
        <div v-if="randomOdd" class="flex flex-col justify-center items-center px-5 text-left">
          <img
            src="/628665198526443cedf94743_open%20source.svg"
            loading="lazy"
            width="151"
            alt="Open source icon"
            class="inline-block mt-0 mb-auto max-w-full align-middle border-0"
          />
          <p class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal">
            Creators and maintainers of many
            <a
              href="/plugins/"
              title="Open source"
              class="font-normal text-indigo-600 cursor-pointer hover:font-normal hover:text-indigo-600"
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
        <div v-else class="flex flex-col justify-center items-center px-5 text-left">
          <img
            src="/6286658deaf6961fb2d6d4c0_core%20contrubutor.svg"
            loading="lazy"
            width="151"
            alt="Core contributors icon"
            class="inline-block mt-0 mb-auto max-w-full align-middle border-0"
          />
          <p class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal">
            Core Contributors to
            <a
              href="https://capacitorjs.com/"
              title="Core contributors"
              class="font-normal text-indigo-600 cursor-pointer hover:font-normal hover:text-indigo-600"
              style="
                transition:
                  color 450ms ease 0s,
                  all 0.3s ease 0s;
                text-decoration: underline;
              "
              >CapacitorJS</a
            >
            and Ionic
          </p>
        </div>
        <!-- <div class="flex flex-col justify-center items-center px-5 text-left">
      <img
        src="/628665a5ba01e30ef2b73d6e_podcats.svg"
        loading="lazy"
        width="151"
        alt="Podcast icon"
        class="inline-block mt-0 mb-auto max-w-full align-middle border-0"
      />
      <p
        class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal "
      >
        Host of
        <a
          href="/podcast-react-native-show"
          title="The CapacitorJS Show podcast"
          class="font-normal text-indigo-600 cursor-pointer hover:font-normal hover:text-indigo-600"
          style="transition: color 450ms ease 0s, all 0.3s ease 0s; text-decoration: underline;"
          >The CapacitorJS Show podcast</a
        >
      </p>
    </div>
    <div class="flex flex-col justify-center items-center px-5 text-left">
      <img
        src="/6286660c09b3981a1294914e_rneu.webp"
        loading="lazy"
        width="151"
        alt="RNEU icon"
        class="inline-block mt-0 mb-auto max-w-full align-middle border-0"
      />
      <p
        class="block mt-0 mb-auto text-lg text-center text-white whitespace-normal "
      >
        Organizers of the biggest CapacitorJS conference -
        <a
          href="https://www.react-native.eu/"
          title="CapacitorJS EU"
          class="font-normal text-indigo-600 cursor-pointer hover:font-normal hover:text-indigo-600"
          style="transition: color 450ms ease 0s, all 0.3s ease 0s; text-decoration: underline;"
          >CapacitorJS EU</a
        >
      </p>
    </div> -->
      </div>
    </div>
    <plugin_marketing />
    <div
      class="block clear-both relative flex-col items-center my-auto max-w-none font-sans font-light leading-8 text-center text-slate-900 sm:max-w-none"
      style="grid-area: 1 / 1 / 2 / 2; padding: 10vh 5vw 5vh"
    >
      <div class="leading-8 text-slate-900">
        <div role="list" class="text-center">
          <div role="listitem" class="text-slate-900">
            <div class="flex flex-col items-center mx-auto sm:relative sm:mx-auto" style="max-width: 100vh">
              <p class="mt-0 mb-2 font-serif text-6xl font-normal text-slate-300 sm:text-6xl sm:font-normal sm:text-indigo-600" style="line-height: 96px">“</p>
              <div class="table clear-both mb-10 text-lg italic font-normal" style="grid-area: 1 / 1 / 2 / 2">
                <p class="mt-0 mb-2 italic">
                  I would have
                  <strong class="italic font-bold">no hesitation in recommending Capgo</strong>
                  to others, to provide a flexible solution to an existing workforce or on a longer-term basis as part of a remote team
                </p>
              </div>
              <img loading="lazy" height="80" src="/waynium.webp" alt="wainium logo" class="hidden mb-4 max-w-full align-middle border-0" style="border-radius: 100%" />
              <div class="text-xl font-medium leading-6">Iannis</div>
              <div>CTO &amp; Co-founder @ WAYNIUM</div>
              <a
                href="#"
                class="inline-block max-w-full font-normal text-indigo-600 bg-transparent cursor-pointer hover:text-black"
                style="transition: all 0.2s ease 0s; text-decoration: none"
                ><img width="39" loading="lazy" alt="logo waynium" src="/waynium.webp" class="inline-block mt-3 max-w-full align-middle border-0"
              /></a>
            </div>
          </div>
        </div>
        <div role="navigation" aria-label="List" class="flex flex-wrap justify-center text-center" />
      </div>
    </div>
    <section
      id="contact-hireus"
      class="block relative flex-col items-center my-auto max-w-none font-sans font-light leading-8 text-center bg-slate-900 text-slate-900 sm:max-w-none"
      style="padding: 10vh 5vw"
    >
      <div class="flex flex-col md:flex-row w-full">
        <div class="flex flex-col font-sans font-light leading-8 text-left text-slate-900 w-1/3">
          <h2
            class="block justify-center items-start pt-0 pb-10 pl-16 mt-5 mb-0 text-xs font-bold leading-4 text-black uppercase bg-no-repeat bg-auto"
            style="background-image: url('/5f58c922ef1b872549f97d10_bg-subtitle.svg'); background-position: 0px 3px; filter: invert(100%); letter-spacing: 1.7px; min-width: 3px"
          >
            <strong class="text-left uppercase" style="letter-spacing: 1.7px">contact</strong><br class="text-left uppercase" style="letter-spacing: 1.7px" />
          </h2>
        </div>
        <div class="flex flex-col">
          <h3 class="pt-2 pb-10 my-0 mr-10 w-full font-sans text-6xl font-medium text-left text-white" style="line-height: 72px">
            <strong class="text-6xl text-left" style="line-height: 72px">Let's work </strong
            ><span class="text-6xl text-left text-indigo-600" style="line-height: 72px"><strong class="font-medium" style="line-height: 72px">together!</strong></span
            ><br class="text-6xl text-left" style="line-height: 72px" />
          </h3>

          <p class="block mt-auto mb-2 font-sans text-lg font-light leading-8 text-left text-white whitespace-normal bg-transparent">
            {{ translations['need_help_with_cordova_or_capacitorjs_let_us_know'][props.locale] }}
          </p>
          <a
            href="https://cal.com/martindonadieu/capacitor-code-review-and-consulting-services"
            target="_blank"
            class="inline-block pt-4 pr-12 pb-2 pl-6 mt-8 h-12 text-xs font-bold leading-3 text-white uppercase bg-white bg-no-repeat bg-auto rounded-none border-2 border-white border-solid transition-none cursor-pointer bg-opacity-[0] hover:border-indigo-300 hover:bg-indigo-300 hover:bg-indigo-300 sm:w-auto sm:max-w-none sm:flex-initial"
            style="
              transition: all 0.2s ease 0s;
              text-decoration: none;
              letter-spacing: 2px;
              background-image: url('/5f58c92280502cbbdcae3f56_arrow-right-button-bright.svg');
              background-position: 100% 50%;
            "
            ><strong class="uppercase" style="letter-spacing: 2px">{{ translations['book_a_consultation'][props.locale] }}</strong></a
          >
        </div>
      </div>
    </section>
  </div>
</template>
