"use client";
import { PanZoom } from "./PanZoom";

const SpecTree = ({ specs }: { specs?: any[] }) => {
  if (!specs?.length) return null;

  const label = (o: any, fall = "بدون عنوان") =>
    o?.title || o?.name || o?.slug || fall;

  return (
    <PanZoom className="my-4 !bg-gradient-to-tr !from-slate-600 !to-neutral-900">
      <div className="tree" dir="ltr">
        <ul>
          {(specs || []).map((group: any) => (
            <li key={`g-${group.id}`}>
              <a href="#">{label(group)}</a>
              {group.attributes?.length ? (
                <ul>
                  {group.attributes.map((attr: any) => (
                    <li key={`a-${attr.id}`}>
                      <a href="#">{label(attr, "ویژگی")}</a>
                      {attr.values?.length ? (
                        <ul>
                          {attr.values.map((val: any) => (
                            <li key={`v-${val.id}`}>
                              <a href="#">
                                {val?.display_color ? (
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 10,
                                      height: 10,
                                      borderRadius: 9999,
                                      marginInlineEnd: 6,
                                      background: val.display_color,
                                      border: "1px solid #ddd",
                                      verticalAlign: "-2px",
                                    }}
                                  />
                                ) : null}
                                {val?.value ?? "-"}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </PanZoom>
  );
};

export default SpecTree;
